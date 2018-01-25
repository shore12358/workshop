<template>
    <div class="container">
        <Multiselect v-model.trim="reProcess" :options="reProcessOptions" placeholder="选择返工工序" :searchable="false" :close-on-select="true" :show-labels="false" class="selectReProcess" :allow-empty="false"></Multiselect>
        <div v-if="possessesFetch.length > 0">
            <h5 class="title">主要责任技师：</h5>
            <div :class="`list-item ${tech.choosen ? 'item-checked' : ''}`" v-for="tech in techList" :key="tech.processId" @click="handleTech(tech)">
                {{tech.processName}}：{{tech.techName}}{{tech.techName2 ? `、${tech.techName2}` : ''}}
                <Icon name="check-circle" class="icon-check" ></Icon>
            </div>
        </div>

        <div v-if="unitsPlatmetal.length > 0">
            <h5 class="title">返工项目-钣金：</h5>
            <div :class="`list-item ${unit.choosen ? 'item-checked' : ''}`" v-for="unit in unitsPlatmetal" :key="unit.partsId" @click="handelUnit(unit)">
                <div class="list-box">
                    {{unit.partsName}}
                    <p v-if="unit.remark">{{unit.remark}}</p>
                </div>
                <Icon name="check-circle" class="icon-check" ></Icon>
            </div>
        </div>
        <div v-if="unitsPaint.length > 0">
            <h5 class="title">返工项目-油漆：</h5>
            <div :class="`list-item ${unit.choosen ? 'item-checked' : ''}`" v-for="unit in unitsPaint" :key="unit.partsId" @click="handelUnit(unit)">
                <div class="list-box">
                    {{unit.partsName}}
                    <p v-if="unit.remark">{{unit.remark}}</p>
                </div>
                <Icon name="check-circle" class="icon-check" ></Icon>
            </div>
        </div>

        <h5 class="title">选择返工原因（多选）</h5>
        <div>
            <span :class="`reason-item ${it.choosen ? 'reason-item-picked' : ''}`" v-for="it in reasonOptions" :key="it.itemId" @click>{{it.itemName}}</span>
        </div>
        <textarea id="reason-input" placeholder="请输入返工原因（限150字）" v-model.trim="inputReason" @keyup="keyup"></textarea>

        <div class="btn-group">
            <div class="btn btn-default" >取消</div>
            <div class="btn btn-confirm" >确定</div>
        </div>
    </div>
</template>
<script>
    import { queryItemMasters, getReworkInfo } from '../../api/Api';

    export default {
        name: 'rework',
        data () {
            return {
                reProcess: '',
                reasonOptions: [],
                inputReason: '',
                possessesFetch: [],
                unitsPlatmetal: [],
                unitsPaint: []
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
            techList () {
                const start_rework_process = this.possessesFetch.find(process => process.processName.trim() === this.reProcess);
                return this.possessesFetch
                    .filter(possess => possess.processId > start_rework_process.processId && possess.processId < this.pId)
                    .map(item => {
                        item.choosen = false;
                        return item;
                    });
            },


        },
        methods: {
            keyup() {
                if (this.inputReason.length > 150) {
                    this.inputReason = this.inputReason.slice(0, 150);
                }
            },
            handleTech (tech) {
                if (tech.choosen) {
                    tech.choosen = false;
                    return;
                }
                this.techList = this.techList.map(_tech => {
                    _tech.choosen = _tech.processId === tech.processId ? true : false;
                    return _tech;
                })
            },
            handelUnit (unit) {
                unit.choosen = !unit.choosen;
            },

        },
        created () {

            queryItemMasters(1)
                .then(res => {
                    if (res.code === 10000) {
                        this.reasonOptions = res.data;
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
                        debugger

                    }
                });
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
        padding 0 .1rem
        line-height .38rem
        background-color #f9f9f9
        border 1px solid #e1e1e1
        co-flex(space-between)
        margin-bottom .12rem
        .list-box
            flex 1
            p
                text-light(.13rem)
                padding 0 .05rem .15rem 0
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
            /*border 1px solid co-blue*/
</style>