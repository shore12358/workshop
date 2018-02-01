<template>
    <div :class="`orderCard border-${themeColor} ${order.processStatus === 2 ? 'card-opacity' : ''}`" @click="detailPageGo">
        <div class="top">
            <div class="title-wrapper">
                <div class="img-waiting-box" v-if="!order.processEnterTime">
                    <div class="profile-wrapper" v-if="order.techId || order.techId">
                        <img :src="profilePic" alt="">
                    </div>
                    <div class="circle" v-else>待派</div>
                </div>
                <div class="img-box" v-else>
                    <Donut class="donut" :percent="progressRate"></Donut>
                    <div class="progress" :class="`text-${progressRate > 100 ? 'red' : 'blue'}`">{{progressRate}}%</div>
                </div>
                <span>{{order.carNumber}}</span>
                <span class="brand">{{order.carType}}</span>
            </div>
            <ul class="part-box">
                <li>油漆<span>{{order.paintGrade === 1 ? '标准' : '高'}}</span></li>
                <li>面积<span>{{order.paintRates}}</span></li>
                <li>部件<span>{{order.panelRates}}</span></li>
                <li>颜色<span class="car-color-jelly" :style="`background-color: ${order.carColorValue}`"></span></li>
            </ul>
        </div>
        <div class="bottom">
            <ul>
                <li>工 单 号：<span>{{order.roNumber}}</span></li>
                <li>进厂日期：<span v-transDate="order.inTime"></span></li>
            </ul>
            <ul>
                <li>完工日期：<span :class="`text-${themeColor}`" v-transDate="order.planCompletedTime"></span></li>
                <li v-show="order.techName || order.techName2">施 工 人：<span>{{order.techName + (order.techName2 ? '、' + order.techName2 : '')}}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Donut from './Donut';
    import { getUserHeaderImg } from '../api/Api';

    export default {
        name: 'orderCard',
        data () {
            return{
                profilePic: '',
            }
        },
        computed: {
            themeColor () {
                return this.getOrderColor(this.currentTime, this.order.planCompletedTime);
            },
            progressRate () {
                const { processEnterTime, planCompletedTime } = this.order;
                const _rate = Math.ceil((this.currentTime - processEnterTime) * 100 / (planCompletedTime - processEnterTime));
                return _rate > 999 ? 999 : _rate;
            }
        },
        props: ['order', 'currentTime', 'getOrderColor', 'techPic'],
        mounted () {

        },
        components: {
            Donut
        },
        methods:{
            detailPageGo () {
                const { roId, processStatus, processId } = this.order;
                this.$router.push({ name: 'orderDetail', params: { id: roId } });
            },
        },
        created () {
            const { techId, techId2 } = this.order;
            const __techId = techId || techId2;
            if (!__techId) {
                return;
            }
            let _profile = (this.techPic && this.techPic[__techId]) || '';
            if (_profile) {
                this.profilePic = _profile;
            } else {
                getUserHeaderImg(__techId)
                    .then(res => {
                        if (res.code === 10000) {
                            const url = res.data;
                            this.techPic = this.techPic || {};
                            this.profilePic = url;
                            const _techPic = Object.assign({}, this.techPic);
                            _techPic[__techId] = url;
                            Bu.st.setKey('techPic', _techPic);
                        }
                    })
            }
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
    .card-opacity
        opacity .5
    .orderCard
        margin-bottom 0.11rem
        shadow-box()
        border-top 0.06rem solid

        .top
            padding-bottom 0.06rem
            border-bottom 1px dashed co-grey
            background-color #f8f8f8
            .title-wrapper
                padding 0.02rem co-padding 0
                co-flex(flex-start)
                text-dark()
                margin-bottom cp = 0.02rem
                .img-box
                    transform translate3d(0,-0.04rem,0)
                .img-waiting-box
                    co-flex()
                .img-waiting-box, .img-box
                    width w = 0.52rem
                    height w
                    position relative
                    .progress
                        position absolute
                        width w
                        height w
                        top 0
                        left 0
                        line-height w + 0.1 rem
                        text-align center
                        font-size 0.12rem
                    .circle, .profile-wrapper
                        width wd = 74%
                        height wd
                        border-radius 100%
                        co-flex()
                    .circle
                        background-color co-orange
                        color white
                    .profile-wrapper
                        background-color co-grey
                        overflow hidden
                        img
                            width 100%

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
                .car-color-jelly
                    width jw = .12rem
                    height jw
                    margin-left .08rem

        .bottom
            padding co-padding co-padding 0.02rem
            text-light(0.12rem)
            ul
                co-flex(flex-start)
                li
                    flex 1
                    margin-bottom 0.1rem
                span
                    text-dark(0.12rem)

</style>