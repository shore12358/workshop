<template>
    <ul class="tabs">
        <li v-for="(t, index) in tabs" :key="t.key" @click="handleTab(index)">
            {{t.text}} {{t.num}}
            <span :class="`color-block ${ index === focusIndex ? 'blue-block' : '' }`" ></span>
        </li>

    </ul>
</template>

<script>
    /**
     * nav.key {number} represent for status
     *  0: waiting
     *  1: working
     *  2: task-working
     *  3: task-preparing
     */
    export default {
        name: 'orderCardTabs',
        data() {
            return {
                focusIndex: 0,
                tabs: [
                    {
                        key: 0,
                        num: 12,
                        text: '等待中'
                    },
                    {
                        key: 1,
                        num: 15,
                        text: '施工中'
                    },
                ]
            }
        },
        // props: [ tabs ],
        methods: {
            handleTab(index) {
                this.focusIndex = index;

            }
        },
        updated () {
            console.log('updated')
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../styles/Util.styl"

    .tabs
        co-flex()
        margin-bottom .1rem
        li
            flex 1
            co-flex(, column)
            font-size .16rem
            padding .1rem 0
        .color-block
            display block
            width 0.3rem
            height 0.04rem
            margin-top .05rem
            background-color transparent
        .blue-block
            background-color co-blue





</style>