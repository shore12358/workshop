<template>
    <div class="container">
        <Multiselect v-model.trim="reProcess" :options="reProcessOptions" placeholder="选择返工工序" :searchable="false" :close-on-select="true" :show-labels="false" class="selectReProcess" :allow-empty="false"></Multiselect>
        <div v-if="techList.length > 0">
            <h5 class="title">主要责任技师：</h5>
            <div :class="`list-item ${tech.choosen ? 'item-checked' : ''}`" v-for="tech in techList" :key="tech.processId" @click="handleTech(tech)">
                {{tech.processName}}：{{tech.techName}}{{tech.techName2 ? `、${tech.techName2}` : ''}}
                <Icon name="check-circle" class="icon-check" ></Icon>
            </div>
        </div>

        <div v-if="unitsPlatmetal.length > 0 && reProcess">
            <h5 class="title">返工项目-钣金：</h5>
            <div :class="`list-item ${unit.choosen ? 'item-checked' : ''}`" v-for="unit in unitsPlatmetal" :key="unit.partsId" @click="handelMulti(unit)">
                <div class="list-box">
                    {{unit.partsName}}
                    <p v-if="unit.remark">{{unit.remark}}</p>
                </div>
                <Icon name="check-circle" class="icon-check" ></Icon>
            </div>
        </div>
        <div v-if="unitsPaint.length > 0 && reProcess">
            <h5 class="title">返工项目-油漆：</h5>
            <div :class="`list-item ${unit.choosen ? 'item-checked' : ''}`" v-for="unit in unitsPaint" :key="unit.partsId" @click="handelMulti(unit)">
                <div class="list-box">
                    {{unit.partsName}}
                    <p v-if="unit.remark">{{unit.remark}}</p>
                </div>
                <Icon name="check-circle" class="icon-check" ></Icon>
            </div>
        </div>

        <h5 class="title">选择返工原因（多选）</h5>
        <div>
            <span :class="`reason-item ${it.choosen ? 'reason-item-picked' : ''}`" v-for="it in reasonOptions" :key="it.itemId" @click="handelMulti(it)">{{it.itemName}}</span>
        </div>
        <div class="input-wrapper">
            <textarea id="reason-input" placeholder="请输入返工原因（限150字）" v-model.trim="inputReason" @keyup="keyup"></textarea>
            <div class="tip"><span :class="`${inputReason.length === 150 ? 'tip-red' : ''}`">{{inputReason.length}}</span>/{{150 - inputReason.length}}</div>
        </div>

        <div class="btn-group">
            <div class="btn btn-default" @click="cancel">取消</div>
            <div class="btn btn-confirm" @click="rework">确定</div>
        </div>
        <Toast :text="toast_conf.text" v-show="toast_conf.shown"></Toast>

    </div>
</template>
<script>
    import { queryItemMasters, getReworkInfo, reworkProcess } from '../../api/Api';
    import { mapMutations } from 'vuex';

    export default {
        name: 'rework',
        data () {
            return {
                reProcess: '',
                reasonOptions: [],
                inputReason: '',
                possessesFetch: [],
                unitsPlatmetal: [],
                unitsPaint: [],
                techList: [],
                toast_conf: {
                    text: '',
                    shown: false
                },
            }
        },
        computed: {
            roId () {
                return Number(this.$route.params.oId);
            },
            pId () {
                return Number(this.$route.params.pId);
            },
            reProcessOptions () {
                return this.possessesFetch.map(possess => possess.processName)
            },

        },
        methods: {
            ...mapMutations([
                'updateFromPush'
            ]),
            keyup() {
                if (this.inputReason.length > 150) {
                    this.inputReason = this.inputReason.slice(0, 150);
                }
            },
            handleTech (tech) {
                if (tech.choosen) {
                    this.techList = this.techList.map(_tech => {
                        _tech.choosen = false;
                        return _tech;
                    });
                    return;
                }
                this.techList = this.techList.map(_tech => {
                    _tech.choosen = _tech.processId === tech.processId ? true : false;
                    return _tech;
                })
            },
            handelMulti (item) {
                item.choosen = !item.choosen;
            },
            showToast (text) {
                this.toast_conf = Object.assign({}, { text, shown: true });
                setTimeout(() => {
                    this.toast_conf = Object.assign(this.toast_conf, { shown: false });
                }, 1500);
            },
            cancel () {
                this.$router.go(-1);
            },
            getUnitsId (units) {
                const unites = units.filter(unit => unit.choosen);
                return units
                    .filter(unit => unit.choosen)
                    .map(unit => unit.roPartsId);
            },
            getUnitsInfo () {
                return {
                    roPartsIds: this.getUnitsId(this.unitsPlatmetal).concat(this.getUnitsId(this.unitsPaint))
                }
            },
            getTechInfo () {
                const _techInfo = Object.assign({}, this.techList.find(tech => tech.choosen));
                delete _techInfo.processName;
                delete _techInfo.choosen;
                return _techInfo;
            },
            checkReasonInfo () {
                const pickedReasons = this.reasonOptions.filter(reason => reason.choosen);
                if (this.inputReason && this.inputReason.length < 4) {

                    // show toast: length not enough
                    this.showToast(`未达到<br/>输入字数`);
                    return false;
                }
                if (pickedReasons.length || this.inputReason) {
                    return {
                        causeIds: pickedReasons.map(reason => reason.itemId),
                        remark: `${pickedReasons.map(reason => reason.itemName).join()},${this.inputReason}`
                    }
                }

                // show toast: without reasons
                this.showToast(`信息<br/>不完整`);
                return false;
            },
            rework () {
                const unitsInfo = this.getUnitsInfo();
                const techInfo = this.getTechInfo();
                if (!(unitsInfo.roPartsIds.length > 0 && Object.keys(techInfo).length > 0)) {

                    // show toast: incomplete info
                    this.showToast(`信息<br/>不完整`);
                    return;
                }

                const reasonInfo = this.checkReasonInfo();
                if (!reasonInfo) {
                    return;
                }

                const postData = Object.assign({ roId: this.roId }, techInfo, unitsInfo, reasonInfo);
                reworkProcess(postData)
                    .then(res => {
                        if (res.code === 10000) {
                            this.updateFromPush({ content: res.data, crudType: 3 });
                            this.$router.go(-1);
                        }
                    })
            },
        },
        created () {
            Bu.setHeadline('返工操作选择');
            queryItemMasters(1)
                .then(res => {
                    if (res.code === 10000) {
                        this.reasonOptions = res.data.map(reason => {
                            reason.choosen = false;
                            return reason;
                        });
                    }
                });
            getReworkInfo(this.roId, this.pId)
                .then(res => {
                    if (res.code === 10000) {
                        const data = res.data;
                        const units = data.roPartses;
                        this.possessesFetch = data.processes;
                        this.unitsPlatmetal = units
                            .filter(unit => unit.partsType === 2)
                            .map(unit => {
                                unit.choosen = false;
                                return unit;
                            });
                        this.unitsPaint = units
                            .filter(unit => unit.partsType === 1)
                            .map(unit => {
                                unit.choosen = false;
                                return unit;
                            });

                    }
                });
        },
        watch: {
            reProcess (_reProcess) {
                const start_rework_process = this.possessesFetch.find(process => process.processName.trim() === _reProcess);
                if (_reProcess) {
                    this.techList = this.possessesFetch
                        .filter(possess => possess.processId >= start_rework_process.processId && possess.processId < this.pId)
                        .map(item => {
                            item.choosen = false;
                            return item;
                        });
                    return;
                }
                this.techList = [];
            }
        },


    };
</script>
<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    pd = .2rem;
    bbc = #e1e1e1
    .container
        padding 0.3rem pd 0
    .title
        text-dark()
        margin .1rem 0
    .reason-item
        text-dark(0.12rem)
        display inline-block
        padding .05rem .1rem
        background-color #f9f9f9
        border 1px solid bbc
        margin 0 .1rem .1rem 0
    .reason-item-picked
        color white
        background-color co-blue
    #reason-input
        border 1px solid bbc
        background-color #f9f9f9
        width 100%
        height 1rem
        box-sizing: border-box;
        padding .1rem
        text-light()
        &::-webkit-input-placeholder
            text-light()
    .list-item
        padding 0.08rem .1rem
        background-color #f9f9f9
        border 1px solid #e1e1e1
        co-flex(space-between)
        margin-bottom .12rem
        .list-box
            flex 1
            p
                text-light(.13rem)
                padding 0.08rem .05rem 0.08rem 0
    .icon-check
        width auto;
        height .25rem;
        color #ccc

    .item-checked
        border 1px solid co-blue
        .icon-check
            color co-blue
    .btn-group
        position fixed
        width 100%
        height .48rem
        left 0
        bottom 0
        co-flex()
        .btn
            flex 1
            line-height .48rem
            text-align center
            border-top 1px solid bbc
            font-size .16rem
        .btn-default
            color co-blue
            background-color white
        .btn-confirm
            color white
            background-color co-blue
    .input-wrapper
        position relative
    .tip
        position absolute
        bottom d = .1rem
        right d
        color #666
    .tip-red
        color co-red
</style>