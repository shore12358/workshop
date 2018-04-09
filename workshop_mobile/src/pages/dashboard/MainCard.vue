<template>
    <div class='mainCard'>
        <div class="mainCard-wrapper">
            <div class='mainCard-box'>
                <ul class='left'>
                    <li>钣喷车辆<span>{{oCs.carsNum}}</span></li>
                    <li>施工车辆<span>{{oCs.processNum}}</span></li>
                    <li>待修车辆<span>{{oCs.waitingNum}}</span></li>
                </ul>
                <ul class='middle'>
                    <li>今天接车<span>{{oCs.todayEnterNum}}</span></li>
                    <li>明天目标<span>{{oCs.tomorrowTargetNum}}</span></li>
                    <li>返工车辆<span>{{oCs.reworkCarsNum}}</span></li>
                </ul>
                <ul class='right'>
                    <li>今天完工<span v-if="oCs.todayFinishedNum !== undefined && oCs.todayPlanFinishNum !== undefined">{{oCs.todayFinishedNum}}/{{oCs.todayPlanFinishNum}}</span></li>
                    <li>完工超时<span>{{oCs.overtimeNum}}</span></li>
                    <li>中断车辆<span>{{oCs.pauseNum}}</span></li>
                </ul>
            </div>
            <div class="paint-box">
                油漆面数
                <Icon name="caret-down" scale=".9" class="icon-caret-down"></Icon>
            </div>
        </div>
        <transition name="fade">
            <div class="paint-popout" v-show="show_paint_box">
                <div class='mainCard-box'>
                    <ul class='left popCard-left'>
                        <li>钣喷车辆<br><span>{{fixedNumber(pD.carsPaintSum)}}</span></li>
                        <li>施工车辆<br><span>{{fixedNumber(pD.processPaintSum)}}</span></li>
                        <li>待修车辆<br><span>{{fixedNumber(pD.waitingPaintSum)}}</span></li>
                    </ul>
                    <ul class='middle'>
                        <li>今天接车<br><span>{{fixedNumber(pD.todayEnterPaintSum)}}</span></li>
                        <li>明天目标<br><span>{{fixedNumber(pD.tomorrowTargetPaintSum)}}</span></li>
                        <li>返工车辆<br><span>{{fixedNumber(pD.reworkCarsPaintSum)}}</span></li>
                    </ul>
                    <ul class='right'>
                        <li>今天完工<br><span>{{fixedNumber(pD.todayFinishedPaintSum)}} <span v-if="pD.todayFinishedPaintSum !== undefined && pD.todayPlanFinishPaintSum !== undefined">/</span> {{fixedNumber(pD.todayPlanFinishPaintSum)}}</span></li>
                        <li>完工超时<br><span>{{fixedNumber(pD.overtimePaintSum)}}</span></li>
                        <li>中断车辆<br><span>{{fixedNumber(pD.pausePaintSum)}}</span></li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    import { ElePosi } from '../../utils/domEvents';
    export default {
        name: 'mainCard',
        data() {
            return {
                ele: null,
                show_paint_box: false,
            }
        },
        computed: {
            ...mapGetters([
                'getOverTimeNum',
            ])
        },
        props: ['oCs', 'pD'],
        methods: {
            ...mapMutations([
                'updateOvertimeCounts'
            ]),
            fixedNumber (val) {
                if (val !== undefined) {
                    return val.toFixed(1);
                }
            },
            popoutHandler (e) {
                let tem = { x: e.x || e.pageX || e.target.changedTouches[0].pageX, y: e.y || e.pageY || e.target.changedTouches[0].pageY };
                // console.log(e, tem);

                if (this.ele) {
                    if (this.ele.judgeInArea(tem)) {
                        this.show_paint_box = true;
                    } else {
                        this.show_paint_box = false;
                    }
                }
            }
        },
        created () {
            const REFRESH_TIME = 60 * 1000;
            this.updateOvertimeCounts({ overTimeNum: this.getOverTimeNum });
            this.countInterval = setInterval(() => {
                this.updateOvertimeCounts({ overTimeNum: this.getOverTimeNum });
            }, REFRESH_TIME)
        },
        mounted () {
            const p_b = document.querySelector('.paint-box');
            this.ele = new ElePosi(p_b);
            window.addEventListener('touchend', this.popoutHandler);
            // window.addEventListener('click', this.popoutHandler);
        },
        beforeDestroy () {
            clearInterval(this.countInterval);
            window.removeEventListener('touchend', this.popoutHandler);
            // window.removeEventListener('click', this.popoutHandler);
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    bg-color = #f2f2f2
    self-pad = .07rem

    .mainCard
        padding 0.1rem
        background-color bg-color
        position relative
    .paint-popout
        position absolute
        padding 0.1rem
        top 100%
        margin-top -.18rem
        left 0
        z-index 100
        width 100%
        box-sizing border-box
        .mainCard-box
            radius(0)
            box-shadow 0 0 0.05rem rgba(0, 0, 0, 0.2)

    .paint-box
        background-color bg-color
        padding self-pad
        co-flex()
        text-light(, true)
        .icon-caret-down
            margin-left self-pad
    .mainCard-wrapper
        radius(4)
        overflow hidden
        box-shadow 0 0 0.04rem rgba(0, 0, 0, 0.1)

    .mainCard-box
        background-color white
        padding 0.13rem 0.17rem
        co-flex(space-between)

        .left, .middle, .right
            flex 1
            li
                margin-bottom 0.1rem
                &:last-child
                    margin-bottom 0!important
                span
                    margin-left 0.08rem

        .left
            text-light(, true)
            border-right: 1px dashed #e8e8e8
            margin-right 0.2rem
            li
                span
                    font-size 0.18rem
                    color co-blue-bright
                    font-weight bold
        .popCard-left
            li
                span
                    margin-top .02rem
                    display inline-block
                    font-size 0.14rem
        .middle, .right
            text-light()
            span
                text-dark()


</style>