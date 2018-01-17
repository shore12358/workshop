<template>
    <ul class="nav">
        <li :class="`${permissionOk(1) ? 'selectable': ''}`" @click="operationPageGo(1)">开工</li>
        <li :class="`${permissionOk(2) ? 'selectable': ''}`" @click="operationPageGo(2)">中断</li>
        <li :class="`${permissionOk(3) ? 'selectable': ''}`" @click="operationPageGo(3)">完工</li>
    </ul>
</template>

<script>
    export default {
        name: 'nav',
        props: ['permission', 'pName', 'pId', 'roId'],
        methods: {
            permissionOk (num) {
                return this.permission.indexOf(num) > -1;
            },
            operationPageGo (num) {
                if (this.permissionOk(num)) {
                    const { roId, pId, pName } = this;
                    switch (num) {
                        case 1:
                            this.$router.push({ name: 'startUp', params: { roId }, query: { pId, pName } });
                            break;
                        case 2:
                        case 3:
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