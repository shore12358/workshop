<template>
    <div class="tabs">
        <div :class="`item ${focusIndex === n.key ? 'item-bright' : ''}`" v-for="n in nav" :key="n.key" @click="handleTab(n.key)">
            <Icon :name="n.icon" class="tab-icon" scale="1.5"></Icon>
            <p>{{n.text}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
          return {
              nav: [
                {
                    key: 0,
                    icon: 'home',
                    text: '看板'
                },
                {
                    key: 1,
                    icon: 'user',
                    text: '任务'
                },
            ]
          }
        },
        props: ['focusIndex'],

        methods: {
            handleTab(key) {
                switch (key) {
                    case 0:
                        this.$router.replace({ path: '/user/dashboard' });
                        break;
                    case 1:
                        this.$router.replace({ path: '/user/task' });
                        break;
                    default:

                }
            }
        },

    }
</script>

<style lang="stylus" scoped>
    @import "../styles/Util.styl"

    .tabs
        co-flex()
        width 100%
        height 0.49rem
        background-color #f9f9f9
        border-top #d9d9d9 1px solid
        position fixed
        bottom 0
        left 0

        .item
            flex 1
            co-flex(, column)
            text-light(0.1rem)
        .item-bright
             color co-blue-bright
        .tab-icon
            font-size 0.16rem
        z-index 1100




</style>