<template>
    <div :class="`orderCard border-${themeColor}`">
        <div class="top">
            <div class="title-wrapper">
                <div class="img-box">
                    <Donut class="donut" :percent="80" :isExpired="0"></Donut>
                    <div>80%</div>
                </div>
                <span>{{order.carNumber}}</span>
                <span class="brand">{{order.carType}}</span>
            </div>
            <ul class="part-box">
                <li>油漆<span>高</span></li>
                <li>面积<span>12</span></li>
                <li>部件<span>12</span></li>
                <li>颜色<span class="bg-black"></span></li>
            </ul>
        </div>
        <div class="bottom">
            <ul>
                <li>工 单 号：<span>TH18834234</span></li>
                <li>进厂日期：<span v-transDate="order.inTime"></span></li>
            </ul>
            <ul>
                <li>完工日期：<span :class="`text-${themeColor}`" v-transDate="order.planCompletedTime"></span></li>
                <li>施 工 人：<span>17-02-26 18：32</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Donut from './Donut'

    export default {
        name: 'orderCard',
        data () {
            return{

            }
        },
        computed: {
            themeColor () {
                return this.getOrderColor(this.currentTime, this.order.planCompletedTime);
            }
        },
        props: ['order', 'currentTime', 'getOrderColor'],
        mounted () {

        },
        components: {
            Donut
        },
        methods:{

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../styles/Util.styl"

    co-padding = 0.15rem

    .border-blue
        border-top-color co-blue-bright!important
    .border-green
        border-top-color co-green!important
    .border-red
        border-top-color co-red!important
    .border-orange
        border-top-color co-orange!important

    .text-blue
        color co-blue!important
    .text-green
        color co-green!important
    .text-red
        color co-red!important
    .text-orange
        color co-orange!important

    .orderCard
        margin-bottom 0.11rem
        shadow-box()
        border-top 0.06rem solid

        .top
            padding-bottom co-padding
            border-bottom 1px dashed co-grey
            background-color #f8f8f8
            .title-wrapper
                padding 0 co-padding
                co-flex(flex-start)
                text-dark()
                margin-bottom cp = 0.05rem
                .img-box
                    width w = 0.5rem
                    height w
                    position relative
                    &>div
                        position absolute
                        width w
                        height w
                        top 0
                        left 0
                        line-height w + 0.1 rem
                        text-align center
                        font-size 0.01rem

                span
                    margin-left cp
                .brand
                    text-light()
            .part-box
                co-flex()
                li
                    co-flex()
                    text-light()
                    flex 1
                    border-right 0.01rem solid co-grey
                    &:last-child
                        border 0
                    &>span
                        text-dark()
                        margin-left 0.05rem

        .bottom
            padding co-padding
            text-light(0.1rem)
            ul
                co-flex(flex-start)
                li
                    flex 1
                    margin-bottom 0.1rem
                span
                    text-dark(0.1rem)


</style>