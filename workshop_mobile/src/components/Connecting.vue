<template>
    <div class="shadow-wrapper"  @touchmove="prevent($event)">
        <div class="connecting-wrapper">
            <h5 v-html="title"></h5>
            <p v-html="text"></p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'connecting',
        methods: {
            prevent (e) {
                e.preventDefault();
            }
        },
        props: ['title', 'text'],
    };
</script>

<style lang="stylus" scoped>
    @import "../styles/Util.styl"

    .shadow-wrapper
        position fixed
        width 100%
        height 100%
        background-color rgba(51,51,51,0.3)
        z-index 8080
    .connecting-wrapper
        width w = 2.5rem
        height h = 1.2rem
        position absolute
        top 50%
        left 50%
        margin-left - (w/2)
        margin-top - h
        background-color white
        radius(7)
        text-align center
        h5
            margin-top .2rem
            margin-bottom .12rem
            font-size .17rem
            color #000
        p
            font-size .14rem
            line-height .22rem
            color #888

</style>

