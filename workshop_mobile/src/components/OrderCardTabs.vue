<template>
    <ul class="tabs">
        <li v-for="(t, index) in tabs" :key="index" @click="handleTab(index)">
            {{t.text}} {{t.num}}
            <span :class="`color-block ${ index === focusIndex ? 'blue-block' : '' }`" ></span>
        </li>

    </ul>
</template>

<script>
    export default {
        name: 'orderCardTabs',
        data() {
            return {
                focusIndex: 0,
            }
        },
        props: [ 'tabs' ],
        methods: {
            handleTab(index) {
                this.focusIndex = index;
                this.$emit('tabChange', index);

            }
        },
        created () {
//            console.log(this.tabs);
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
            &:last-child
                width 50%
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