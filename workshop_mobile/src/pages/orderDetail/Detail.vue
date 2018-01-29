<template>
    <div class="container">
        <div class="wrapper">
            <p class="title">工单基本信息</p>
            <ul class="basic-detail">
                <li>
                    <span class="label w3">工 单 号：</span>
                    <span class="content">{{detail.roNumber}}</span>
                </li>
                <li>
                    <span class="label w2">车 型：</span>
                    <span class="content">{{detail.carType}}</span>
                </li>
                <li>
                    <span class="label w2">车 牌：</span>
                    <span class="content">{{detail.carNumber}}</span>
                </li>
                <li>
                    <span class="label" >车身颜色：</span>
                    <span class="content"><span class="car-color-box" :style="`background-color: ${detail.carColorValue}`"></span>{{detail.carColorName}}</span>
                </li>
                <li>
                    <span class="label" >油漆档次：</span>
                    <span class="content" v-show="typeof detail.paintGrade === 'number'">{{detail.paintGrade === 1 ? '标准' : '高'}}</span>
                </li>
                <li>
                    <span class="label" >是否加急：</span>
                    <span class="content" v-show="typeof detail.isEmergency === 'number'">{{detail.isEmergency === 0 ? '加急' : '不加急'}}</span>
                </li>
                <li>
                    <span class="label" >到厂日期：</span>
                    <span class="content" v-transDate="detail.inTime" v-show="detail.inTime"></span>
                </li>
                <li>
                    <span class="label" >计划完工：</span>
                    <span class="content" v-transDate="detail.planCompletedTime" v-show="detail.planCompletedTime"></span>
                </li>
            </ul>
        </div>

        <div class="wrapper" v-if="detail.roPartses instanceof Array && detail.roPartses.length > 0">
            <p class="title">部件定损</p>
            <div class="units-box" v-if="plateMetalUnits.length > 0">
                <ul class="units-title">
                    <li>钣金项目</li>
                    <li>钣金数</li>
                    <li>损伤程度</li>
                </ul>
                <div v-for="pu in plateMetalUnits" :key="pu.partsDegree">
                    <div class="units-suite" v-if="pu.partsDegree === -1">
                        <ul class="item">
                            <li>{{pu.partsName}}</li>
                            <li>{{pu.partsCount}}</li>
                            <li></li>
                        </ul>
                        <p class="des-note">{{pu.remark}}</p>
                    </div>
                    <ul class="units-item" v-else>
                        <li>{{pu.partsName}}</li>
                        <li>{{pu.partsCount}}</li>
                        <li>{{pu.partsDegreeName}}</li>
                    </ul>
                </div>
            </div>
            <div class="units-box" v-if="paintUnits.length > 0">
                <ul class="units-title">
                    <li>油漆项目</li>
                    <li>漆面数</li>
                    <li>损伤程度</li>
                </ul>

                <div v-for="pu in paintUnits" :key="pu.partsDegree">
                    <div class="units-suite" v-if="pu.partsDegree === -1">
                        <ul class="item">
                            <li>{{pu.partsName}}</li>
                            <li>{{pu.partsCount}}</li>
                            <li></li>
                        </ul>
                        <p class="des-note">{{pu.remark}}</p>
                    </div>
                    <ul class="units-item" v-else>
                        <li>{{pu.partsName}}</li>
                        <li>{{pu.partsCount}}</li>
                        <li>{{pu.partsDegreeName}}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="wrapper" v-if="detail.remark">
            <p class="title">维修备注</p>
            <p class="des-note">{{detail.remark}}</p>
        </div>

        <div class="wrapper" v-if="detail.roMaintenLogs instanceof Array && detail.roMaintenLogs.length > 0">
            <p class="title">维修记录</p>
            <div class="fix-record">
                <div class="item-box" v-for="(l, index) in detail.roMaintenLogs" :key="index">
                    <p><span v-transDate="l.enterTime"></span> ~ <span v-transDate="l.leaveTime"></span>
                        <span class="fix-label" v-if="l.processStatus">{{l.processStatus === 1 ? '预计' : '中断'}}</span>
                    </p>
                    <ul class="text-line">
                        <li>工序：<span>{{getProcessName(l.processId)}}</span></li>
                        <li>施工人：<span>{{l.techName}}{{l.techName2 ? `, ${l.techName2}`:``}}</span></li>
                    </ul>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import { getOrderDetail } from '../../api/Api';
    import { mapGetters } from 'vuex';


    export default {
        name: 'detail',
        data () {
            return {

            }
        },
        props: ['detail'],
        computed: {
            ...mapGetters([
               'getLineList',
            ]),
            plateMetalUnits () {
                try {
                    return this.detail.roPartses.filter(unit => unit.partsType === 2);
                } catch (e) {
                    return [];
                }
            },
            paintUnits () {
                try {
                    return this.detail.roPartses.filter(unit => unit.partsType === 1);
                } catch (e) {
                    return [];
                }
            }

        },
        created () {

        },
        methods: {
            getProcessName (id) {
                return this.getLineList.find(line => line.ProcessID = id).ProcessName;
            },

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"
    d-grey = #f9f9f9
    d-blue = #dae9fb

    grid(bg)
        padding .05rem .1rem
        background-color bg

    grey-grid()
        grid(d-grey)

    blue-grid()
        grid(d-blue)

    .container
        padding 0 .1rem
    .wrapper
        margin-bottom .15rem
    .title
        margin .1rem 0
        text-dark(.16rem)
    .basic-detail
        &>li
            grey-grid()
            co-flex(flex-start)
            margin-bottom .02rem
        .label
            flex 1
            letter-spacing: 0.01rem
        .w3
            word-spacing: 0.02rem
        .w2
            word-spacing: 0.25rem
        .car-color-box
            display: inline-block
            width w = .12rem
            height w
            margin-right .05rem
        .content
            flex 3
            co-flex(flex-start)

    .units-box
        margin-bottom .02rem
    .units-title, .units-item
        co-flex(flex-start)
        li
            flex 1
            margin-right s = .02rem
            margin-bottom s
            &:last-child
                margin-right 0
    .units-title li
        blue-grid()
    .units-item li
        grey-grid()
    .units-suite
        background-color d-grey
        .item
            co-flex(flex-start)
            li
                flex 1
                grey-grid()
        p
            grey-grid()
    .des-note
        grey-grid()
        padding-top  pt = .1rem
        padding-bottom pt
    .fix-record
        .item-box
            border-left 1px dashed #ccc
            padding-left .15rem
            padding-bottom .1rem
            &::before
                content ''
                width fw = .09rem
                height fw
                position absolute
                transform translate3D(-0.2rem, 0.05rem, 0)
                background-color #90cdff
                radius(fw * 100)
            .text-line
                co-flex()
                margin .05rem 0
                li
                    flex 1
                span
                    text-light()
    .fix-label
        padding .02rem .06rem
        radius(3)
        border 1px solid co-blue
        text-align center
        font-size .1rem
        color co-blue

</style>