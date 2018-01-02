<template>
    <div class="container">
        <OrderCardTabs></OrderCardTabs>
        <OrderCard></OrderCard>
    </div>
</template>

<script>
    import OrderCard from '../../components/OrderCard'
    import OrderCardTabs from '../../components/OrderCardTabs'
    import { mapGetters } from 'vuex'

    export default {
        name: 'orderList',
        data () {
            return {
                orders: []
            }
        },

        computed: {
            ...mapGetters([
                'getOrdersByProcessId'
            ]),
            processId () {
                return this.$route.params.processId;

            }
        },
        created () {
            if ([0, 3].indexOf(this.processId) !== -1) {

            }
        },

        mounted () {
            console.log('mounted OrderList')

        },
        components: {
            OrderCard,
            OrderCardTabs
        },
        methods:{

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0 0.11rem







</style>