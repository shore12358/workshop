<template>
    <div>
        <NavBar :permission="permission" :isQualityProcess="isQualityProcess" @popoutGo="popoutGo" @startUpGo="startUpGo" @interruptGo="interruptGo" @reworkGo="reworkGo" @photographyGo="photographyGo"></NavBar>
        <Detail :detail="detail" :orderId="orderId" :permission="permission"></Detail>
        <Popout @confirm="confirm" @cancel="cancel" :pod="popout_conf" v-show="showPopout"></Popout>
        <Toast :text="toast_conf.text" v-show="toast_conf.shown"></Toast>
    </div>
</template>

<script>
    import NavBar from './Nav';
    import Detail from './Detail';
    import { mapGetters, mapMutations } from 'vuex';
    import { processCompleted, getOrderDetail, getProcessPhoto, postProcessPhoto } from '../../api/Api';

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
                toast_conf: {
                    text: '',
                    shown: false
                },
                showPopout: false,
                units_car: []
            }
        },
        computed: {
            ...mapGetters([
                'queryOrderById',
                'getWorkingZoneList',
                'getLineList',
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
            isQualityProcess () {
                for (let line of this.getLineList) {
                    for (let process of line.ProcesseList) {
                        if (process.ProcessID === this.processId) {
                            if (process.IsQualityProcess) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
                return false;
            },

            workingZoneList () {
                return this.getWorkingZoneList(this.order.lineId);
            },
            permission () {
                return this.setPermission(this.processStatus, this.workingZoneList, this.processId, this.detail.needProcessPhoto, this.detail.evidenceStatus);
            },
            currentProcessLogId () {
                try {
                    return this.detail.roMaintenLogs[0].roMaintenanceLogId;
                } catch (e) {
                    return null;
                }
            }
        },
        created () {
            this.techId = Bu.st.getTechInfoSync().employeeId;
            this.myProcessList = Bu.st.getKey('myProcessList');
            Bu.setHeadline('工单详情');
            getOrderDetail(this.orderId)
                .then(res => {
                    if (res.code === 10000) {
                        this.detail = res.data;
                        if (this.detail.needProcessPhoto) {
                            getProcessPhoto(this.currentProcessLogId)
                                .then(res => {
                                    this.units_car = this.initUnitsCar(res.data);
                                });
                        }

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
            setPermission (pStatus, pList, pId, photoFlag, eStatus) {
                const _permission = [];
                if (eStatus != 2) {
                    if (photoFlag) {
                        _permission.push(3);
                    }
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
                            _permission.push(1);
                        }

                    } else {
                        if (this.responsibleForTheProcess(pId)) {
                            switch (pStatus) {
                                case 0:
                                    if (this.technicianAssigned(this.order) || this.order.techId === null) {
                                        _permission.push(1);
                                    }
                                    break;
                                case 1:
                                    if (this.technicianAssigned(this.order)) {
                                        _permission.push(2, 4);
                                    }
                                    break;
                                case 2:
                                    if (this.technicianAssigned(this.order)) {
                                        _permission.push(1);
                                    }
                                    break;
                                default:

                            }
                        }

                    }
                }
                return _permission;
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
                        switch (res.code) {
                            case 10000:
                                this.updateFromPush({ content: res.data, crudType: 3 });
                                this.$router.replace({ path: '/user/dashboard' });
                                break;
                            case 20109:
                                this.showToast(res.message);
                                break;
                            default:

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
            showToast (text) {
                this.toast_conf = Object.assign({}, { text, shown: true });
                setTimeout(() => {
                    this.toast_conf = Object.assign(this.toast_conf, { shown: false });
                }, 1500);
            },
            photographyGo () {
                const media = {
                    photography: false,
                    picPosition: [0, 0],
                    onlyPreview: false,
                    data: this.units_car,
                };
                console.log('fn photograph is running with params ', media);
                Bu.st.fetchPhotoList(media);
                Bu.st.getPhotoList()
                    .then(pList => {
                        this.units_car = pList;
                        const carPartsPhotoMap = this.transferPhotoFormat(pList);
                        postProcessPhoto({
                            carPartsPhotoMap,
                            roMaintenanceLogId: this.currentProcessLogId
                        })
                            .then(res => {
                                if (res.code == 10000) {
                                    getOrderDetail(this.orderId)
                                        .then(res => {
                                            if (res.code === 10000) {
                                                this.detail = res.data;

                                            }
                                        });
                                    return;
                                }
                                console.error('error when posting process photos: ', res.message);
                            })

                    })
            },
            transferPhotoFormat (pList) {
                const general = {
                    providerCode: 2,
                    typeCode: 1,
                };
                const carPartsPhotoMap = {};
                for (let unit of this.units_car) {
                    if (unit.picUrls) {
                        carPartsPhotoMap[unit.id] = unit.picUrls.map(picUrl => {
                            return Object.assign({ id: picUrl.Url }, general);
                        });
                    } else {
                        carPartsPhotoMap[unit.id] = null;
                    }
                }
                return carPartsPhotoMap;
            },
            initUnitsCar (data) {
                try {
                    const units = data.map((unit, index) => {
                        const s = {
                            id: unit.partsCode.toString(),
                            title: unit.partsName,
                            maxLimit: 0,
                        };
                        try {
                            s.picUrls = unit.partsPhotos.map(pic => {
                                return {
                                    DoMain: pic.domain,
                                    Url: pic.id
                                };
                            });
                        } catch (e) {
                            s.picUrls = null;
                        }
                        return s;

                    });
                    console.log('unit', units);
                    return units;
                } catch (e) {
                    return [];
                }
            },
        },
        components: {
            NavBar,
            Detail
        }

    }
</script>