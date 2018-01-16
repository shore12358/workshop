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
        PREPARING: [0, 2],
        WORKING: [1]
    };

    export default {
        name: 'task',
        data () {
            return {
                tabIndex: 0
            }
        },
        computed: {
            ...mapGetters([
                'getMyOrders',
                'getCurrentTime'

            ]),
            getOrderColor () {
                return getOrderColor();
            },
            orders () {
                const _orders = [];
                const pre_orders = this.getMyOrders.filter(order => ORDER.PREPARING.indexOf(order.processStatus) > -1);
                const working_orders = this.getMyOrders.filter(order => ORDER.WORKING.indexOf(order.processStatus) > -1);
                working_orders.length && _orders.push(working_orders);
                pre_orders.length && _orders.push(pre_orders);
                return _orders;
            },
            tabs () {
                const _tabs = this.orders.map(order => { return { num: order.length } });
                const tabs_conf = [
                    {
                        filterKey: ORDER.WORKING,
                        text: '在做任务'
                    },
                    {
                        filterKey: ORDER.PREPARING,
                        text: '预派任务'
                    }
                ];
                const tabs = _tabs.map((tab, index) => {
                    return Object.assign(tab, tabs_conf[index]);
                });
                return tabs;
            },
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