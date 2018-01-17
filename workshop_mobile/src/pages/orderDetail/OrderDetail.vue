<template>
    <div>
        <Nav></Nav>
        <Detail></Detail>
    </div>
</template>

<script>
    import Nav from './Nav';
    import Detail from './Detail';
    import { mapGetters } from 'vuex';

    export default {
        name: 'orderDetail',
        data () {
            return {
                processInCharge: ''
            }
        },
        computed: {
            ...mapGetters([
                'queryOrderById'
            ]),
            order () {
                return this.queryOrderById(this.orderId);
            },
            orderId () {
                return this.$route.params.id;
            },
            processStatus () {
                return this.$route.query.processStatus;
            },
            processId () {
                return this.$route.query.processId
            },
            myProcessList () {
                return Bu.st.getKey('myProcessList');
            },
            techId () {
                return Bu.st.getTechInfo().techId;
            }
        },
        created () {

        },
        methods: {
            responsibleForTheProcess (pId) {
                const { ProcessName } = this.myProcessList.find(process => pId === process.ProcessID);
                ProcessName && (this.processInCharge = ProcessName);
                return !!ProcessName;
            },
            technicianOk (order) {
                return ([].push(order.techId, order.techId2)).indexOf(this.techId) > -1
            },

            /*
             *
             * 1 start working  2 interrupt 3 finished
             */
            setPermission (pStatus, pList, oId, pId) {
                if (pId === 0) {
                    //  todo: waiting
                } else {
                    if (this.responsibleForTheProcess(pId)) {
                        switch (pStatus) {
                            case 0:
                                if (this.technicianOk(this.order) || this.order.techId === null) {
                                    return [1];
                                }
                                break;
                            case 1:
                                if (this.technicianOk(this.order)) {
                                    return [2, 3];
                                }
                                break;
                            case 2:
                                if (this.technicianOk(this.order)) {
                                    return [1];
                                }
                                break;
                            default:

                        }
                    }
                    return [];

                }
            }
        },
        components: {
            Nav,
            Detail
        }

    }
</script>

<style lang="stylus" scoped>

</style>