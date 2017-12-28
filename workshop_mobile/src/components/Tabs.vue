<template>
    <div class="tabs">
        <div class="item" v-for="n in nav" :key="n.key" @click="handleTab(n.key)">
            <img :src="n.img" alt="">
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
                    img: '',
                    text: '看板'
                },
                {
                    key: 1,
                    img: '',
                    text: '任务'
                },
            ]
          }
        },
        methods: {
            handleTab(key) {
                if (key === 1) {
                    this.$router.push({ path: 'Task' });
                }

            }
        }
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
            co-flex()
            font-size 0.1rem
            color co-blue-bright




</style>