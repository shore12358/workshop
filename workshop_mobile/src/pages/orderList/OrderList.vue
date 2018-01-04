<template>
    <div class="container">
        <OrderCardTabs :tabs="tabs" @tabChange="tabChange"></OrderCardTabs>
        <div v-for="od in orders[tabIndex]" :key="od.roId">
            <OrderCard :order="od" :currentTime="currentTime" :getOrderColor="getOrderColor"></OrderCard>
        </div>
    </div>
</template>

<script>
    import OrderCard from '../../components/OrderCard'
    import OrderCardTabs from '../../components/OrderCardTabs'
    import { mapGetters } from 'vuex'
    import { getOrderColor } from "../../utils/utils";

    const ORDER = {
        WAITING: 0,
        WORKING: 1
    };

    export default {
        name: 'orderList',
        data () {
            return {
                tabIndex: 0
            }
        },

        computed: {
            ...mapGetters([
                'getOrdersByProcessId',
                'getTimeGap'
            ]),
            getOrderColor () {
                return getOrderColor();
            },
            currentTime () {
                return Date.now() + this.getTimeGap;
            },
            processId () {
                return this.$route.params.processId;

            },
            tabs () {
                const tabs = [];
                let { waiting_orders_num: wa_num, working_orders_num: wo_num } = this.$route.query;
                wa_num = Number(wa_num);
                wo_num = Number(wo_num);
                if (wa_num) {
                    tabs.push({
                        key: ORDER.WAITING,
                        num: wa_num,
                        text: '等待中'
                    })
                }
                if (wo_num) {
                    tabs.push({
                        key: ORDER.WORKING,
                        num: wo_num,
                        text: '施工中'
                    });
                }
                return tabs;
            },
            orders () {
                const _orders = this.getOrdersByProcessId(this.processId);
                return this.tabs.map((item) => {
                    return _orders.filter(order => order.roStatus === item.key)  // make sure the key in tabs is consistent with the roStatus in orders
                });
            }

        },
        created () {

        },

        mounted () {

        },
        components: {
            OrderCard,
            OrderCardTabs
        },
        methods:{
            tabChange (index) {
                this.tabIndex = index;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0 0.11rem







</style>