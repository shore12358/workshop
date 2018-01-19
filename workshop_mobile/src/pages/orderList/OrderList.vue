<template>
    <div class="container">
        <OrderCardTabs :tabs="tabs" @tabChange="tabChange"></OrderCardTabs>
        <div v-for="od in orders[tabIndex]" :key="od.roId">
            <OrderCard :order="od" :currentTime="getCurrentTime" :getOrderColor="getOrderColor"></OrderCard>
        </div>
    </div>
</template>

<script>
    import OrderCard from '../../components/OrderCard'
    import OrderCardTabs from '../../components/OrderCardTabs'
    import { mapGetters } from 'vuex'
    import { getOrderColor } from "../../utils/utils";

    const ORDER = {
        WAITING: [0, 2],
        WORKING: [1]
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
                'getCurrentTime'
            ]),
            getOrderColor () {
                return getOrderColor();
            },
            processId () {
                return this.$route.params.processId;

            },
            ordersFromProcess () {
                return this.getOrdersByProcessId(this.processId);
            },
            waitingOrders () {
               return this.ordersFromProcess.filter(order => ORDER.WAITING.indexOf(order.processStatus) > -1);
            },
            workingOrders () {
                return this.ordersFromProcess.filter(order => ORDER.WORKING.indexOf(order.processStatus) > -1);
            },
            tabs () {
                const tabs = [];
                let _len;
                if (_len = this.waitingOrders.length) {
                    tabs.push({
                        filterKey: ORDER.WAITING,
                        num: _len,
                        text: '等待中'
                    })
                }
                if (_len = this.workingOrders.length) {
                    tabs.push({
                        filterKey: ORDER.WORKING,
                        num: _len,
                        text: '施工中'
                    });
                }
                return tabs;
            },
            orders () {
                return [this.waitingOrders, this.workingOrders].filter(order => order.length);
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