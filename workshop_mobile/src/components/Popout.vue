<template>
    <div @touchmove="prevent($event)">
        <div class="shadow" @touchstart="cancel"></div>
        <div class="popout-wrapper">
            <div class="w-top">
                <h5>{{pod.title || ''}}</h5>
                <p>{{pod.text || ''}}</p>
            </div>
            <ul class="w-btn">
                <li @touchstart="cancel">取消</li>
                <li :class="`text-${pod['confirm_color'] || 'blue'}`" @touchstart="confirm">确定</li>
            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'popout',
        data () {
            return {

            }
        },
        props: ['pod'],
        methods: {
            confirm () {
                this.$emit('confirm');
            },
            cancel () {
                this.$emit('cancel');
            },
            prevent (e) {
                e.preventDefault();
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import "../styles/Util.styl"
    .text-blue
        color co-blue-bright!important
    .text-red
        color co-red!important
    .shadow
        background-color rgba(0, 0, 0, 0.4)
        position fixed
        width 100%
        height 100%
        top 0
        left 0
    .popout-wrapper
        width w = 2.5rem
        position fixed
        top 50%
        left 50%
        margin-left -(w/2)
        margin-top -0.7rem
        z-index 1000
        radius(5)
        background-color white
    .w-top
        padding .2rem 0 .15rem
        text-align center
        h5
            text-dark(0.16rem)
            margin-bottom .1rem
        p
            text-light()
    .w-btn
        border-top 1px solid sC = #e5e5e5
        co-flex()
        li
            flex 1
            line-height .45rem
            text-dark(0.16rem)
            text-align center
            line-height .45rem
            border-right 1px solid sC
            &:last-child
                border-right 0



</style>
