<template>
    <div class="container">
        <div class="wrapper">
            <p class="title">工单基本信息</p>
            <ul class="basic-detail">
                <li>
                    <span class="label w3">工 单 号：</span>
                    <span class="content">TH12345678</span>
                </li>
                <li>
                    <span class="label w2">车 型：</span>
                    <span class="content">上海通用汽车别克凯越123</span>
                </li>
                <li>
                    <span class="label w2">车 牌：</span>
                    <span class="content">沪C12345</span>
                </li>
                <li>
                    <span class="label" >车身颜色：</span>
                    <span class="content"><span class="car-color-box"></span>黑色</span>
                </li>
                <li>
                    <span class="label" >油漆档次：</span>
                    <span class="content">高档油漆</span>
                </li>
                <li>
                    <span class="label" >是否加急：</span>
                    <span class="content">是</span>
                </li>
                <li>
                    <span class="label" >到厂日期：</span>
                    <span class="content">17-11-26 13:13</span>
                </li>
                <li>
                    <span class="label" >计划完工：</span>
                    <span class="content">17-11-26 13:13</span>
                </li>
            </ul>
        </div>

        <div class="wrapper">
            <p class="title">部件定损</p>
            <div class="units-box">
                <ul class="units-title">
                    <li>钣金项目</li>
                    <li>钣金数</li>
                    <li>损伤程度</li>
                </ul>
                <ul class="units-item">
                    <li>左前翼子板</li>
                    <li>2.0</li>
                    <li>轻</li>
                </ul>
                <div class="units-suite">
                    <ul class="item">
                        <li>改装套件</li>
                        <li>2.0</li>
                        <li></li>
                    </ul>
                    <p class="des-note">内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述</p>
                </div>
            </div>
        </div>

        <div class="wrapper">
            <p class="title">维修备注</p>
            <p class="des-note">内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述</p>
        </div>

        <div class="wrapper">
            <p class="title">维修记录</p>
            <div class="fix-record">
                <div class="item-box">
                    <p>11／26 18:15 ~ 11/26 18:15 <span class="fix-label">预计</span></p>
                    <ul class="text-line">
                        <li>工序：<span>原子灰中涂</span></li>
                        <li>施工人：<span>途小虎，途二虎</span></li>
                    </ul>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'detail',
        created () {

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
            background-color black
            margin-right .05rem
        .content
            flex 3
            co-flex(flex-start)


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