<template>
    <div class="wrapper">
        <div class="box">
            <input id="searchbar" :placeholder="holderValue" v-model.trim="tempQueryKey"  @focus="focus"/>
            <Icon name="search" class="search"></Icon>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';

    const HOLDER = '车牌、车型、工单号';

    export default {
        name: 'searchbar',
        data () {
            return {
                tempQueryKey: '',
                holderValue: ''
            };
        },
        computed: {
            ...mapGetters([
                'getQueryKey',
            ]),
        },
        methods: {
            focus () {
                if (!this.tempQueryKey && this.getQueryKey) {
                    this.modifyQueryKey({ queryKey: '' });
                    this.holderValue = HOLDER

                }
            },
            ...mapMutations([
                'modifyQueryKey'
            ]),

        },
        created () {
            this.holderValue = this.getQueryKey || HOLDER;
        },
        watch: {
            tempQueryKey (key) {
                this.modifyQueryKey({ queryKey: key.toLowerCase() });
            }
        },
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