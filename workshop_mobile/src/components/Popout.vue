<template>
    <div class="container">
        <div class="w-top">
            <h5>工单完工</h5>
            <p>您确定此项工序完工了吗？</p>
        </div>
        <ul class="w-btn">
            <li>取消</li>
            <li >确定</li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: 'popout',
        data () {
            return {

            }
        },
    };
</script>

<style lang="stylus" scoped>
    @import "../styles/Util.styl"
    .container
        width w = 2.7rem
        height h = 1.4rem
        position fixed
        top 50%
        left 50%
        margin-left -(w/2)
        margin-top -(h/2)
        z-index 1000
        radius(5)
    .w-top
        padding .2rem 0 .1rem
        text-align center
        h5
            text-dark(0.16rem)
        p
            text-light()
    .w-btn
        border-top 1px solid sC = #e5e5e5
        co-flex()
        li
            flex 1
            line-height .45rem
            text-dark(0.16rem)
            border-right 1px solid sC
            &:last-child
                border-right 0



</style>
