<template>
    <div v-if="units_car.length">
        <div class="wrapper">
            <div class="title">
                <span class="text">{{processName}}·{{photoNum}}</span>
            </div>
            <div class="units-wrapper">
                <div v-for="(p, i) in units_car">
                    <div class="item" >
                        <span class="item-title">
                            {{p.title}}
                        </span>
                        <span class="item-action" v-if="!p.picUrls && editable" @touchstart="photograph([i, 0], true)">
                            <Icon name="plus-circle" scale="1" class="sm-plus"></Icon>
                            待拍照
                        </span>
                    </div>
                    <!--display and add photos-->
                    <div class="photos-wrapper" v-if="p.picUrls">
                        <!--item-->
                        <div class="photo-wrapper" v-for="(item, j) in p.picUrls">
                            <div class="photo-box">
                                <div class="photo-item" :style="`background-image: url('${item.DoMain + item.Url + picPostfix}')`" @touchstart="photograph([i, j], false)"></div>
                                <div class="icon-remove" @click="removePhotoPre([i, j])" v-if="editable">
                                    <Icon name="times-circle" scale="1.5"></Icon>
                                </div>
                            </div>
                        </div>
                        <div class="photo-wrapper" @touchstart="photograph([i, p.picUrls.length], true)" v-if="editable">
                            <div class="photo-box photo-box-default">
                                <div class="plus-circle-box">
                                    <Icon name="plus-circle" scale="1.3" class="plus-circle"></Icon>
                                </div>
                                <span>
                                    添加照片
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="btn-wrapper" v-if="editable">
            <div class="btn btn-photo" @touchstart="photograph([0, 0], true)">批量拍照</div>
            <div :class="`btn ${submitPermission ? 'btn-active' : ''} `" @click="submit()" >保存</div>
        </div>


        <!--popout-->
        <Popout @confirm="confirm" @cancel="cancel" :pod="confirm_conf" v-show="showPopout"></Popout>
        <!--toast-->
    </div>

</template>

<script>
    import { getProcessPhoto, postProcessPhoto } from '../../api/Api';

    export default {
        name: 'orderDetail',
        data () {
            return {
                confirm_conf: {
                    title: '删除照片',
                    text: '您确定要删除该照片吗？',
                },
                edited: false,
                showPopout: false,
                remove_args: null,
                units_car: [],
                picPostfix: '@400w_400q.jpg',
            }
        },
        computed: {
            roId () {
                return Number(this.$route.params.orderId);
            },
            logId () {
                return Number(this.$route.params.logId);
            },
            editable () {
                return Boolean(this.$route.query.editable);
            },
            processName () {
                return this.$route.query.processName;
            },
            photoNum () {
                if (this.units_car.length) {
                    return this.units_car.reduce((result, item) => {
                        return result + (item.picUrls ? item.picUrls.length : 0);
                    }, 0)
                }
                return this.$route.query.photoNum;

            },
            submitPermission () {

                //  only get permission after editing
                return this.edited;
            },

        },
        methods: {
            photograph (picPosition, photography) {
                const media = {
                    photography,
                    picPosition,
                    onlyPreview: !this.editable,
                    data: this.units_car,
                };
                console.log('fn photograph is running with params ', media);
                Bu.st.fetchPhotoList(media);
                Bu.st.getPhotoList()
                    .then(pList => {
                        try {
                            console.log('final data: ' + pList);
                            if (JSON.stringify(this.units_car) !== JSON.stringify(pList)) {
                                this.edited = true;
                            }
                            this.units_car = pList;
                            console.log('ready', this.units_car)
                        } catch (e) {
                            console.warn(new TypeError('data format PLIST fectched is wrong!'));
                        }
                    });
            },
            initUnitsCar (data) {
                try {
                    const units = data.map((unit, index) => {
                        const s = {
                            id: unit.partsCode.toString(),
                            title: unit.partsName,
                            maxLimit: 0,
                        };
                        try {
                            s.picUrls = unit.partsPhotos.map(pic => {
                                return {
                                    DoMain: pic.domain,
                                    Url: pic.id
                                };
                            });
                        } catch (e) {
                            s.picUrls = null;
                        }
                        return s;

                    });
                    console.log('unit', units);
                    return units;
                } catch (e) {
                    return [];
                }
            },
            confirm () {
                console.log(this.remove_args);
                if (this.remove_args) {
                    const { position } = this.remove_args;
                    let { picUrls } = this.units_car[position[0]];
                    picUrls.splice(position[1], 1);
                    if (!picUrls.length) {
                        this.units_car[position[0]].picUrls = null;
                    }
                    this.edited = true;
                }
                this.showPopout = false;
            },
            cancel () {
                this.showPopout = false;
            },
            removePhotoPre (position) {
                this.showPopout = true;
                this.remove_args = { position };
            },
            submit () {
                if (this.submitPermission) {
                    const carPartsPhotoMap = this.transferPhotoFormat(this.units_car);
                    postProcessPhoto({
                        carPartsPhotoMap,
                        roMaintenanceLogId: this.logId
                    })
                        .then(res => {
                            if (res.code == 10000) {
                                this.edited = false;
                                return;
                            }
                            console.error('error when posting process photos: ', res.message);
                        })
                }
            },
            transferPhotoFormat (pList) {
                const general = {
                    providerCode: 2,
                    typeCode: 1,
                };
                const carPartsPhotoMap = {};
                for (let unit of this.units_car) {
                    if (unit.picUrls) {
                        carPartsPhotoMap[unit.id] = unit.picUrls.map(picUrl => {
                            return Object.assign({ id: picUrl.Url }, general);
                        });
                    } else {
                        carPartsPhotoMap[unit.id] = null;
                    }
                }
                return carPartsPhotoMap;
            },

        },

        created () {
            Bu.setHeadline('照片详情');
            getProcessPhoto(this.logId)
                .then(res => {
                    if (res.code == 10000) {
                        console.log('units data ', res.data);
                        this.units_car = this.initUnitsCar(res.data);
                        console.log(this.units_car);
                        // debugger;
                    }
                });
        }
    };
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    deepGrey = #999
    pd       = .1rem
    .wrapper
        background-color white
        margin-bottom .1rem

    .title
        @extend .co-title
    .basic-info
        padding 0 co-padding
        height .4rem
        co-flex()
        li
            flex 1
    .icon-remove
        position absolute
        right po = -0.04rem
        top po
        color co-blue

    .car-pic
        width 100%
        height 100%
        background-size cover
    .car-photo-wrapper
        padding 0 0 .1rem co-padding
        co-flex(space-between)
        .car-photo, .car-photo-default
            box-sizing border-box
            flex 1
            co-flex(flex-start, column)
            text-align center
            height 1.1rem
            background-color co-deep-grey
            color deepGrey
            margin-right .15rem
            position relative
        .car-photo-default
            padding-top .15rem
        .plus-circle
            display inline-block
            color deepGrey
            margin-bottom .1rem
    .units-wrapper
        padding 0 co-padding co-padding
        .item
            background-color #f9f9f9
            height .4rem
            margin-bottom 2px
            padding 0 pd
            co-flex(space-between)
        .item-title
            text-dark(.16rem)
        .item-action
            co-flex()
            color co-orange
        .sm-plus
            margin-right .05rem
        .item-des
            text-light()
            background-color #f9f9f9
            padding 0 .1rem .05rem
            transform translate3D(0, -5px, 0)
    .btn-wrapper
        width 100%
        height .48rem
        text-align center
        co-flex()
        position fixed
        bottom 0
        left 0
    .btn
        flex 1
        height 100%
        co-flex()
        text-light(.16rem)
        background-color #edeef0
    .btn-photo
        background-color co-green
        color white
    .btn-active
        background-color co-blue
        color white
    .btn-disabled
        background-color #EDEEF0
        color #999
    .photos-wrapper
        padding 0.08rem 0 .05rem pd = .1rem
        background-color #f9f9f9
        transform translate3D(0, - .06rem, 0)
        co-flex(flex-start)
        .photo-wrapper
            box-sizing border-box
            padding-right pd
            width 25%
            margin-bottom pd
        .photo-box
            width 100%
            height 0
            padding-bottom 100%
            position relative
            background-color co-deep-grey
        .photo-box-default
            co-flex(, column)
            .plus-circle-box, span
                position absolute
                color deepGrey
            .plus-circle-box
                top .12rem
                co-flex()
                width 100%
            span
                width: 100%;
                text-align: center
                font-size .13rem
                bottom .2rem
        .photo-item
            width 100%
            height 0
            padding-bottom 100%
            background-size cover




</style>