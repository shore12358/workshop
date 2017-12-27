<template>
    <div>
        <div class="header"></div>
        <div class="list-content">
            <ul class="list-tab">
                <li>
                    <span @click="tabClass(0)" :class="{activeSelected:currentIdx==0}">等待中<span class="dot">·</span>15</span>
                    <transition name="fade">
                        <span v-if="currentIdx == 0" class="tab-line"></span>
                    </transition>
                </li>
                <li>
                    <span @click="tabClass(1)" :class="{activeSelected:currentIdx==1}">施工中<span class="dot">·</span>15</span>
                    <transition name="fade">
                        <span v-if="currentIdx == 1" class="tab-line"></span>
                    </transition>
                </li>
            </ul>
            <div class="list-item" v-for="(item,key) in [1,2,3]" :key="key">
                <div class="bg-bar"></div>
                <div class="item-content">
                    <div class="car-info">
                        <div>
                            <span class="circle" id="myChart1"></span>
                            <span>沪C12345</span>
                            <span class="title-grey car-type">上海通用汽车别克 凯越</span>
                        </div>
                        <ul class="car-detail">
                            <li><span class="title-grey">油漆</span><span>高</span></li>
                            <li><span class="title-grey">面积</span><span>12</span></li>
                            <li><span class="title-grey">部件</span><span>12</span></li>
                            <li><span class="title-grey">颜色</span><span class="bg-black"></span></li>
                        </ul>
                    </div>
                    <ul class="list-info">
                        <li><span class="text-space small-grey">工单号：</span><span>TH18834234</span></li>
                        <li><span class="small-grey">进厂日期：</span><span>17-11-26 15：32</span></li>
                        <li><span class="small-grey">交车日期：</span><span>17-02-26 18：32</span></li>
                        <li><span class="text-space small-grey">施工人：</span><span>途小虎</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'task',
        data(){
            return{
                currentIdx: 0
            }
        },
        mounted(){
            this.drawPie()
        },
        methods:{
            drawPie(){
                console.log("aa")
                let myChart = this.$echarts.init(document.getElementById('myChart1'));
                var tips = 0;
                function loading() {
                    return [{
                        value: tips,
                        itemStyle: {
                            normal: {
                                color: '#1c84c6',
                                // shadowBlur: 10,
                                // shadowColor: 'yellow'
                            }
                        }
                    }, {
                        value: 100 - tips,
                        itemStyle: {
                            normal: {
                                color: '#f2f2f2',
                                // shadowBlur: 10,
                                // shadowColor: 'yellow'
                            }
                        }
                    }];
                }
                var option = {
                    title: {
                        text: (tips * 1) + '%',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                        fontWeight: 'normal',
                        color: '#1c84c6',
                        fontSize: 10
                        }
                    },
                    series: [{
                        name: 'loading',
                        type: 'pie',
                        radius: ['80%', '100%'],
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false,
                            }
                        },

                    }]
                };
                myChart.setOption(option);
                var setTime = setInterval(function() {
                    ++tips
                    if(tips==100){
                        clearInterval(setTime)
                    }
                    myChart.setOption({
                        title: {
                            text: tips + '%'
                        },
                        series: [{
                            name: 'loading',
                            data: loading()
                        }]
                    })
                }, 1000);
            },
            tabClass(idx){
                this.currentIdx = idx - 0
            }
        }    
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"
    .header
        height 6.4rem
        width 100%
        background #1b88ee
        box-shadow inset 0 0 0 0 #d9d9d9
    .list-content
        .fade-enter-active, .fade-leave-active {
            transition: all 0.25s ease-out;
        }
        .fade-enter, .fade-leave-to {
            opacity 0
            // transform: translateX(10rem)
        }
        padding 0 1rem
        .list-tab
            co-flex(space-around)
            font-size 1.6rem
            color #333333
            width 100%
            padding-top 1.2rem
            li
                co-flex(, column)
                letter-spacing 0
                .activeSelected
                    color #4492e9
                span:first-child
                    line-height 1.7rem
                    margin-bottom 0.4rem
                    .dot
                        width: 1.2rem;
                        height: 1.2rem;
                        display: inline-block;
                        text-align: center;
                .tab-line
                    display inline-block
                    background #4492e9
                    width 3rem
                    height 0.4rem
        .list-item
            background #ffffff
            box-shadow 0 0 0.4rem 0 rgba(0,0,0,0.20)
            border-radius 0.4rem
            width 100%
            margin-bottom 1rem
            &:first-of-type
                margin-top 1.4rem
            .bg-bar
                background #ff9600
                border-radius 10rem
                height 0.6rem
            .item-content
                width 100%
                .car-info
                    background #f8f8f8
                    padding 0.9rem 0 0.9rem 0
                    box-sizing border-box
                    div
                        margin-bottom 0.4rem
                        .circle
                            display inline-block
                            vertical-align middle
                            width 3rem
                            height 3rem
                            margin-right 0.9rem
                            margin-left 1.5rem
                            padding-left 0
                        .car-type
                            margin-left 0.8rem
                        .title-grey
                            font-size:1.4rem;
                            color:#999999;
                    .car-detail
                        display flex
                        li
                            flex 1
                            text-align center
                            border-left 0.1rem solid #e8e8e8
                            &:first-of-type
                                border none
                            span:nth-child(2)
                                margin-left 0.6rem
                                color #333333
                            .bg-black
                                display inline-block
                                width 1.2rem
                                height 1.2rem
                                background #333333
                        
                .list-info
                    border-top 0.1rem solid #e8e8e8
                    padding 0.8rem 1.4rem 0.8rem 1.4rem
                    display flex
                    flex-wrap wrap
                    align-items center
                    li
                        width 50%
                        font-size 1.3rem
                        .small-grey
                            color #999999
                        .text-space
                            letter-spacing 0.468rem
                        &:nth-child(1),&:nth-child(2)
                            margin-bottom 0.7rem
                        
          
        
      
    
  
</style>