<template>
    <div v-if="Object.keys(data).length">
        <div class="wrapper">
            <div class="title">
                <span class="text">车辆拍照</span>
            </div>
            <div class="car-photo-wrapper">
                <div class="car-photo">
                    <div alt="" class="car-pic" :style="`background-image: url(${pictures_car[0].picUrls[0].DoMain + pictures_car[0].picUrls[0].Url + picPostfix})`" @touchstart="preview([0, 0])"></div>
                </div>
                <div class="car-photo">
                    <div alt="" class="car-pic" :style="`background-image: url(${pictures_car[1].picUrls[0].DoMain + pictures_car[1].picUrls[0].Url + picPostfix})`" @touchstart="preview([1, 0])"></div>
                </div>
            </div>
        </div>

        <div class="wrapper">
            <div class="title">
                <span class="text">部件定损照片</span>
            </div>
            <div class="units-wrapper">
                <div v-for="(p, i) in units_car">
                    <div class="item">
                        <span class="item-title">
                            {{p.title}}
                        </span>
                    </div>
                    <!--display photos-->
                    <div class="photos-wrapper">
                        <!--item-->
                        <div class="photo-wrapper" v-for="(item, j) in p.picUrls">
                            <div class="photo-box">
                                <div class="photo-item" :style="`background-image: url('${item.DoMain + item.Url + picPostfix}')`" @touchstart="preview([i + 2, j])"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import { getOrderPhoto } from '../../api/Api';

    export default {
        name: 'orderPhoto',
        data () {
            return {
                data: {},
                pictures_car: [],
                units_car: [],
                picPostfix: '@400w_400q.jpg',
            }
        },
        computed: {
            roId () {
                return Number(this.$route.params.oId);
            },

        },
        methods: {
            preview (picPosition) {
                const media = {
                    photography: false,
                    picPosition,
                    onlyPreview: true,
                    data: this.pictures_car.concat(this.units_car),
                };
                console.log('fn preview is running with params ', media);
                Bu.st.fetchPhotoList(media);
                Bu.st.getPhotoList()
                    .then(pList => {
                        try {
                            console.log('final data: ' + pList);
                            this.pictures_car = pList.slice(0, 2);
                            this.units_car = pList.slice(2);
                            console.log('ready', this.pictures_car, this.units_car)
                        } catch (e) {
                            console.warn(new TypeError('data format PLIST fectched is wrong!'));
                        }
                    });
            },
            initPicturesCar (data) {
                const frame = {
                    id: 'FRAME00',
                    title: '车架',
                    maxLimit: 1,
                };
                const front = {
                    id: 'FORE00',
                    title: '车辆前部',
                    maxLimit: 1,
                };
                try {
                    const { domain, id } = data.carFramePhoto;
                    frame.picUrls = new Array({ DoMain: domain, Url: id });
                } catch (e) {
                    frame.picUrls = null;
                }
                try {
                    const { domain, id } = data.carHeadPhoto;
                    front.picUrls = new Array({ DoMain: domain, Url: id });
                } catch (e) {
                    front.picUrls = null;
                }
                console.log('car', [front, frame]);
                return [front, frame];
            },
            initUnitsCar (data) {
                try {
                    const units = data.roPartses.map((unit, index) => {
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

        },

        created () {
            Bu.setHeadline('部件定损照片详情');
            getOrderPhoto(this.roId)
                .then(res => {
                    if (res.code == 10000) {
                        console.log('detail data ', res.data);
                        this.data = res.data;
                        this.pictures_car = this.initPicturesCar(res.data);
                        this.units_car = this.initUnitsCar(res.data);
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