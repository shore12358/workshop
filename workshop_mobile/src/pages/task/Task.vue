<template>
    <div class="container">
        <div v-if="getMyOrders.length">
            <OrderCardTabs :tabs="tabs" @tabChange="tabChange"></OrderCardTabs>
            <div v-infinite-scroll="load" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="scroll-container">
                <div v-for="od in _orders[tabIndex]" :key="od.roId">
                    <OrderCard :order="od" :currentTime="getCurrentTime" :getOrderColor="getOrderColor" :techPic="techPic" :showProcess="true"></OrderCard>
                </div>
                <Loading :loading="loading"></Loading>
            </div>
        </div>
        <div v-else class="blank-page">
            <img src="https://img3.tuhu.org/PeccancyCheXingYi/4ffe/b332/7a87bec61b47fbdb9f9eabf4_w324_h193.png@100Q.png" alt="">
            <p>您目前没有在做任务哦！</p>
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
    const PAGE_SIZE = 6;

    export default {
        name: 'task',
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
                'getMyOrders',
                'getCurrentTime'

            ]),
            getOrderColor () {
                return getOrderColor();
            },
            workingOrders () {
                return this.getMyOrders.filter(order => ORDER.WORKING.indexOf(order.processStatus) > -1);
            },
            preOrders () {
                return this.getMyOrders.filter(order => ORDER.PREPARING.indexOf(order.processStatus) > -1);
            },
            _orders () {
                return [this.workingOrders.slice(0, this.pageIndex[0] * PAGE_SIZE), this.preOrders.slice(0, this.pageIndex[1] * PAGE_SIZE)].filter(order => order.length);

            },
            tabs () {
                const tabs = [];
                let _len;
                if (_len = this.workingOrders.length) {
                    tabs.push({
                        filterKey: ORDER.WORKING,
                        text: '在做任务',
                        num: _len,
                    })
                }
                if (_len = this.preOrders.length) {
                    tabs.push({
                        filterKey: ORDER.PREPARING,
                        text: '预派任务',
                        num: _len,
                    });
                }
                return tabs;
            },
        },
        created () {
            const map = ['workingOrders', 'preOrders'];
            Bu.setHeadline('我的任务');
            this.locked = this.locked.map((val, i) => {
                if (PAGE_SIZE >= this[map[i]].length) {
                    return true;
                }
                return false;
            });
            this.techPic = Bu.st.getKey('techPic');
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
                                const orderCollection = i === 0 ? 'workingOrders': 'preOrders';
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
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0 0.11rem
    .scroll-container
        height 100%
    .blank-page
        text-align center
        img
            width 1.38rem
            margin-top 1.1rem
            margin-bottom .16rem

  
</style>