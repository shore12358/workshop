<template>
    <ul class="nav">
        <li v-for="(ot, index) in navText" :key="index" :class="`${permissionOk(index + 1) ? 'selectable': 'disabled'}`" @click="operationPageGo(index + 1)">{{ot}}</li>
    </ul>
</template>

<script>
    export default {
        name: 'navBar',
        props: ['permission', 'isQualityProcess'],
        computed: {
            navText () {
                let _process = this.isQualityProcess ? '返工' : '中断';
                return new Array('开工', _process, '完工');
            },

        },
        methods: {
            permissionOk (num) {
                return this.permission.indexOf(num) > -1;
            },
            operationPageGo (num) {
                if (this.permissionOk(num)) {
                    switch (num) {
                        case 1:
                            this.$emit('startUpGo');
                            break;
                        case 2:
                            if (this.isQualityProcess) {
                                this.$emit('reworkGo');
                            } else {
                                this.$emit('interruptGo');
                            }
                            break;
                        case 3:
                            this.$emit('popoutGo');
                            break;
                        default:

                    }
                }
            }
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
        .disabled
            text-shadow: 0 1px 1px white
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