<template>
    <div class="container">
        <OrderCardTabs :tabs="tabs" @tabChange="tabChange"></OrderCardTabs>
        <div v-infinite-scroll="load" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="scroll-container">
            <div v-for="od in _orders[tabIndex]" :key="od.roId">
                <OrderCard :order="od" :currentTime="getCurrentTime" :getOrderColor="getOrderColor" :techPic="techPic"></OrderCard>
            </div>
            <Loading :loading="loading"></Loading>
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
    const PAGE_SIZE = 6;

    export default {
        name: 'orderList',
        data () {
            return {
                tabIndex: 0,
                pageIndex: [1, 1],
                loading: false,
                locked: [false, false],
                techPic: null,
            }
        },

        computed: {
            ...mapGetters([
                'getLineOrdersByProcessId',
                'getCurrentTime'
            ]),
            getOrderColor () {
                return getOrderColor();
            },
            processId () {
                return this.$route.params.processId;
            },
            lineId () {
                return this.$route.query.lineId;
            },
            ordersFromProcess () {
                return this.getLineOrdersByProcessId(this.lineId, this.processId);
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
            _orders () {
                return [this.waitingOrders.slice(0, this.pageIndex[0] * PAGE_SIZE), this.workingOrders.slice(0, this.pageIndex[1] * PAGE_SIZE)].filter(order => order.length);
            }

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
            },
            load () {
                const ANIM_TIME = 300;
                if (!this.locked[this.tabIndex]) {
                    this.loading = true;
                    setTimeout(() => {
                        this.pageIndex = this.pageIndex.map((val, i) => {
                            if (i === this.tabIndex) {
                                const orderCollection = i === 0 ? 'waitingOrders': 'workingOrders';
                                if (++val * PAGE_SIZE >= this[orderCollection].length) {
                                    this.locked[i] = true;
                                }
                            }
                            return val;
                        });
                        this.loading = false;
                    }, ANIM_TIME);
                }

            }

        },
        created () {
            const map = ['waitingOrders', 'workingOrders'];
            this.locked = this.locked.map((val, i) => {
                if (PAGE_SIZE >= this[map[i]].length) {
                    return true;
                }
                return false;
            });
            this.techPic = Bu.st.getKey('techPic');


        },
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0 0.11rem
        height 100%
    .scroll-container
        height 100%

</style>