<template>
    <div class='mainCard'>
        <div class='mainCard-box'>
            <ul class='left'>
                <li>钣喷车辆<span>{{a}}</span></li>
                <li>施工车辆<span>{{b}}</span></li>
                <li>待修车辆<span>{{c}}</span></li>
            </ul>
            <ul class='middle'>
                <li>钣喷车辆<span>{{a}}</span></li>
                <li>施工车辆<span>{{b}}</span></li>
                <li>待修车辆<span>{{c}}</span></li>
            </ul>
            <ul class='right'>
                <li>钣喷车辆<span>{{a}}</span></li>
                <li>施工车辆<span>{{b}}</span></li>
                <li>待修车辆<span>{{c}}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                a: 12,
                b: 23,
                c: 77
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    bg-color = #f2f2f2

    .mainCard
        padding 1rem
        background-color bg-color

    .mainCard-box
        background-color white
        padding 1.3rem 1.7rem
        radius(4)
        co-flex(space-between)

        .left, .middle, .right
            flex 1
            li
                margin-bottom 1rem
                &:last-child
                    margin-bottom 0!important
                span
                    margin-left 0.8rem

        .left
            text-light(, true)
            border-right: 1px dashed #e8e8e8
            li
                span
                    font-size 1.8rem
                    color co-blue-bright

        .middle, .right
            text-light()
            span
                text-dark()





</style>