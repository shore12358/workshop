<template>
    <div class="container" v-if="lineList.length">
        <transition name="fade">
            <Multiselect v-model="line" :options="lineOptions" placeholder="请选择" :searchable="false" :close-on-select="true" :show-labels="false" class="selectLine" :allow-empty="false"></Multiselect>
            <div class="card" v-for="(pi, index) in processList.ProcesseList" :key="pi.ProcessID" @click="orderListGo(pi.ProcessID, pi.ProcessName, index)">
                <div class="left">{{pi.ProcessName}}</div>
                <ul class="right">
                    <li class="working" v-if="pi.ProcessID !== 0">
                        施工中
                        <p>{{processListNum[index].wo_num}}</p>
                    </li>
                    <li class="pending">
                        等待中
                        <p>{{processListNum[index].wa_num}}</p>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'dashboardList',
        computed: {
            ...mapGetters([
                'getOrdersByLineId',
            ]),
            ...mapGetters({
               lineList: 'getLineList'
            }),
            lineOptions () {
                return this.lineList.map((item) => {
                    return item.LineName;
                });
            },
            processList () {
                return this.lineList.find((item) => {
                    return item.LineName === this.line;
                }) || [];
            },

            getLineOrders () {
                return this.getOrdersByLineId(this.processList.LineID);
            },
            processListNum () {
                return this.processList.ProcesseList.map(pi => {
                    return {
                        wa_num: this.getStatusNum(pi.ProcessID, [0, 2]),
                        wo_num: this.getStatusNum(pi.ProcessID, [1]),
                    }
                });
            },


        },
        data () {
            return {
               line: '',
            }
        },
        methods: {
            orderListGo(processId, processName, index) {
                if (this.processListNum[index].wa_num || this.processListNum[index].wo_num) {
                    this.$router.push({ name: 'orderList', params: { processId }, query: { lineId: this.processList.LineID, processName } });
                }
            },
            getStatusNum (processId, statusCollections) {
                return this.getLineOrdersByProcessId(processId).filter(item => statusCollections.indexOf(item.processStatus) > -1).length;
            },
            getLineOrdersByProcessId (processId) {
                return this.getLineOrders.filter(order => order.processId === processId);
            },

        },
        created () {
            this.line = this.lineOptions[0];
        },
        watch: {
            lineOptions (newLineOptions) {
                this.line = newLineOptions[0];
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0.05rem 0.16rem 0.16rem
    .selectLine
        width 30%
        margin-bottom 0.05rem
        font-weight bold
        color #333
    @media screen and (max-width: 350px) {
        .selectLine {
            width 33%
        }
    }
    .card
        height 0.44rem
        margin-bottom 0.1rem
        shadow-box()
        border-left 0.05rem solid co-blue
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
            li
                &:not(:last-child)
                    border-right 1px solid co-grey
                    margin-right 0.1rem
                    padding-right 0.1rem

            .pending
                p
                    color co-red
                    font-weight 600
            .working
                p
                    color co-blue-bright
                    font-weight 600

</style>