<template>
    <div class="container">
        <Multiselect v-model="line" :options="lineOptions" placeholder="请选择" :searchable="false" :close-on-select="false" :show-labels="false" class="selectLine"></Multiselect>
        <div class="card" v-for="pi in processList.processCollection" :key="pi.processId" @click="orderListGo(pi.processId)">
            <div class="left">{{pi.text }}</div>
            <ul class="right">
                <li class="pending">
                    等待中
                    <p>{{ getStatusNum(pi.processId, 0) }}</p>
                </li>
                <li class="working">
                    施工中
                    <p>{{ getStatusNum(pi.processId, 1) }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { getLineList } from '../../api/Api'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'dashboardList',
        computed: {
            ...mapGetters([
                'getOrdersByLineId'
            ]),
            processList () {
                return this.lineList.find((item) => {
                    return item.displayName === this.line;
                }) || [];
            },
            getOrdersByProcessId () {
                return this.getOrdersByLineId(this.processList.lineId);
            },

        },
        data () {
            return {
                lineList: [],
                line: '',
                lineOptions: []
            }
        },
        methods: {
            orderListGo(processId) {
                const waiting_orders_num = this.getStatusNum(processId, 0),
                      working_orders_num = this.getStatusNum(processId, 1);

                if (waiting_orders_num || working_orders_num) {
                    this.$router.push({ name: 'orderList', params: { processId }, query: { waiting_orders_num, working_orders_num } });
                }
            },
            getStatusNum (processId, status) {
                return this.getOrdersByProcessId(processId).filter(item => item.roStatus === status).length;
            },

        },
        created () {
          getLineList()
              .then((list) => {
                this.lineList = list;

                this.lineOptions = list.map((item) => {
                    return item.displayName;
                });
                this.line = this.lineOptions[0];

              });

        },
        updated () {

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0.16rem
    .selectLine
        width 50%
        margin-bottom 0.1rem

    .card
        height 0.44rem
        margin-bottom 0.1rem
        shadow-box()
        border-left 0.04rem solid co-blue
        co-flex(sapce-between)
        text-dark()
        .left, .right
            flex 1
        .left
            padding-left 0.2rem
        .right
            co-flex()
            justify-content flex-end
            text-light(0.1rem)
            padding-right 0.2rem
            .pending, .working
                text-align center
                p
                    font-size 0.16rem
                    margin-top 0.05rem

            .pending
                border-right 1px solid co-grey
                margin-right 0.1rem
                padding-right 0.1rem
                p
                    color co-red
            .working
                p
                    color co-blue-bright




</style>