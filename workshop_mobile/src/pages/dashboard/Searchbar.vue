<template>
    <div class="wrapper">
        <div class="box">
            <input id="searchbar" placeholder="车牌、车型、工单号" v-model.trim="queryKey" @keypress="keyDown"/>
            <Icon name="search" class="search"></Icon>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        name: 'searchbar',
        data () {
            return {
                queryKey: ''
            };
        },
        methods: {
            keyDown ($el) {
                if ($el.keyCode === 13) {
                    if (this.queryKey) {
                        this.modifyQueryKey({ queryKey: this.queryKey });
                    }
                }
            },
            ...mapMutations([
                'modifyQueryKey'
            ]),
        },
        updated () {
            console.log(this.queryKey);
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    text = #bbb

    .wrapper
        padding 0.1rem
        .box
            position relative
            .search
                position: absolute
                top 0
                left 0
                color text
                padding 0.06rem 0 0 0.2rem
    #searchbar
        border 0
        display block
        width 100%
        box-sizing border-box
        &::-webkit-input-placeholder
            color text
        background-color #f2f2f2
        height (h = 0.28) rem
        line-hight h
        radius(h / 2 * 100)
        padding-left .4rem



</style>