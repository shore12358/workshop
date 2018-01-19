<template>
    <div class='mainCard' >
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
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        name: 'mainCard',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'getOverTimeNum',
            ])
        },
        props: ['oCs'],
        methods: {
            ...mapMutations([
                'updateOvertimeCounts'
            ]),
        },
        created () {
            const REFRESH_TIME = 10 * 1000;
            this.countInterval = setInterval(() => {
                this.updateOvertimeCounts({ overTimeNum: this.getOverTimeNum });
            }, REFRESH_TIME)
        },
        beforeDestroy () {
            clearInterval(this.countInterval);
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    bg-color = #f2f2f2

    .mainCard
        padding 0.1rem
        background-color bg-color

    .mainCard-box
        background-color white
        padding 0.13rem 0.17rem
        radius(4)
        box-shadow 0 0 0.04rem rgba(0, 0, 0, 0.1)
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

        .middle, .right
            text-light()
            span
                text-dark()



</style>