<template>
    <ul class="nav">
        <li class="selectable">开工</li>
        <li>中断</li>
        <li>完工</li>
    </ul>
</template>

<script>
    export default {
        name: 'nav',
        created () {

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"
    .nav
        co-flex()
        width 100%
        position fixed
        bottom 0
        left 0
        z-index 1000
        .selectable
            background-color co-blue-bright
            color white
            border-right 1px solid #dae9fb
        li
            flex 1
            co-flex()
            height 0.49rem
            text-light(0.16rem)
            background: #eee;
            border-right 1px solid rgba(255, 255, 255, .7)
            &:last-child
                border-right none

</style>