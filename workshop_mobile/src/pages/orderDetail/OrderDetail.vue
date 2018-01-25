<template>
    <div>
        <Nav :permission="permission" @popoutGo="popoutGo" @startUpGo="startUpGo" @interruptGo="interruptGo" @reworkGo="reworkGo"></Nav>
        <Detail :detail="detail"></Detail>
        <Popout @confirm="confirm" @cancel="cancel" :pod="popout_conf" v-show="showPopout"></Popout>
    </div>
</template>

<script>
    import Nav from './Nav';
    import Detail from './Detail';
    import { mapGetters, mapMutations } from 'vuex';
    import { processCompleted, getOrderDetail } from '../../api/Api';

    export default {
        name: 'orderDetail',
        data () {
            return {
                processInCharge: '',
                processInChargeId: '',
                detail: {},
                popout_conf: {
                    title: '工单完工',
                    text: '您确定此项工序完工了吗？',
                },
                showPopout: false
            }
        },
        computed: {
            ...mapGetters([
                'queryOrderById',
                'getWorkingZoneList',
            ]),
            order () {
                return this.queryOrderById(this.orderId);
            },
            orderId () {
                return Number(this.$route.params.id);
            },
            processStatus () {
                return this.order.processStatus;
            },
            processId () {
                return this.order.processId;
            },
            workingZoneList () {
                return this.getWorkingZoneList(this.order.lineId);
            },
            permission () {
                return this.setPermission(this.processStatus, this.workingZoneList, this.processId);
            },
        },
        created () {
            this.techId = Bu.st.getTechInfoSync().techId;
            this.myProcessList = Bu.st.getKey('myProcessList');
            getOrderDetail(this.orderId)
                .then(res => {
                    if (res.code === 10000) {
                        this.detail = res.data;
                    }

                })
        },
        methods: {
            ...mapMutations([
                'updateFromPush',

            ]),
            responsibleForTheProcess (pId) {
                const { ProcessName, ProcessID } = this.myProcessList.find(process => pId === process.ProcessID) || {};
                if (ProcessID) {
                    this.processInCharge = ProcessName;
                    this.processInChargeId = ProcessID;
                }
                return !!ProcessName;
            },
            technicianAssigned (order) {
                return (new Array(order.techId, order.techId2)).indexOf(this.techId) > -1
            },
            
            /**
             * @param pList {Array} work zone list matches current line
             * @param pId {Number} processId of current order
             * @return {Array} represent for possessed permission: 1 start working  2 interrupt 3 finished
             */
            setPermission (pStatus, pList, pId) {
                if (pId === 0) {
                    let process, matched = false;
                    for (process of pList) {
                        switch (process.ProcessNature) {
                            case 1: // platemetal
                                if (this.order.panelRates > 0) {
                                    matched = true;
                                    break;
                                }
                                continue;
                            case 2: // paint
                                if (this.order.paintRates > 0) {
                                    matched = true;
                                    break;
                                }
                                continue;
                            case 3: // general
                                matched = true;
                                break;
                            default:
                                continue;

                        }
                        if (matched) {
                            break;
                        }
                    }

                    if (matched && this.responsibleForTheProcess(process.ProcessID)) {
                        return [1]
                    }
                    return [];

                } else {
                    if (this.responsibleForTheProcess(pId)) {
                        switch (pStatus) {
                            case 0:
                                if (this.technicianAssigned(this.order) || this.order.techId === null) {
                                    return [1];
                                }
                                break;
                            case 1:
                                if (this.technicianAssigned(this.order)) {
                                    return [2, 3];
                                }
                                break;
                            case 2:
                                if (this.technicianAssigned(this.order)) {
                                    return [1];
                                }
                                break;
                            default:

                        }
                    }
                    return [];

                }
            },
            confirm () {
                this.completeWork();
                this.showPopout = false;
            },
            cancel () {
                this.showPopout = false;
            },
            popoutGo () {
                this.showPopout = true;
            },
            completeWork () {
                processCompleted({ processId: this.processInChargeId, roId: this.orderId })
                    .then(res => {
                        if (res.code === 10000) {
                            this.updateFromPush({ content: res.data, crudType: 3 });
                            this.$router.replace({ path: '/user/dashboard' });
                        }
                    });
            },
            startUpGo () {
                this.$router.push({ name: 'startUp', params: { oId: this.orderId, pId: this.processInChargeId }, query: { pName: this.processInCharge } });
            },
            interruptGo () {
                this.$router.push({ name: 'interrupt', params: { oId: this.orderId, pId: this.processInChargeId } });
            },
            reworkGo () {
                this.$router.push({ name: 'rework', params: { oId: this.orderId, pId: this.processInChargeId } });
            },
        },
        components: {
            Nav,
            Detail
        }

    }
</script>