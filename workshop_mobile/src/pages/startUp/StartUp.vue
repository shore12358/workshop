<template>
    <div class="container">
        <p class="title">开工工序：{{pName}}</p>
        <p class="note">协同技师：</p>
        <div class="technician-list">
            <div :class="`technician-item ${tech.choosen ? 'item-checked' : ''}`" v-for="tech in techList" :key="tech.EmployeeID" @click="handleItem(tech)">
                {{tech.EmployeeName}}
                <Icon name="check-circle" class="icon-check" ></Icon>
            </div>
        </div>
        <div class="btn-group">
            <div class="btn btn-default" @click="detailGo">取消</div>
            <div class="btn btn-confirm" @click="startUp">确定</div>
        </div>

    </div>
</template>

<script>
    import { getTechListByProcessId, processStartUp } from '../../api/Api';
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'startUp',
        data () {
            return {
                techList: [],
            }
        },
        computed: {
            ...mapGetters([
                'queryOrderById'
            ]),
            roId () {
                return Number(this.$route.params.oId);
            },
            pId () {
                return Number(this.$route.params.pId);
            },
            pName () {
                return this.$route.query.pName;
            },
            order () {
                return this.queryOrderById(this.roId);
            },
            me () {
                return Bu.st.getTechInfoSync();
            },
            techAssigned () {
                const techIdFromOrder = new Array(this.order.techId, this.order.techId2);
                return techIdFromOrder.filter(techId => techId !== null && techId !== this.me.techId).pop();
            }
        },
        created () {
            getTechListByProcessId(this.pId)
                .then(res => {
                    if (res.code == 10000) {
                        const _techList = [];
                        res.data.forEach(group => _techList.push(...group.Technicians));
                        this.techList = _techList
                            .filter(tech => tech.EmployeeID !== this.me.techId)
                            .map((tech, index) => {
                                tech.choosen = tech.EmployeeID === this.techAssigned ? true : false;
                                return tech;
                            });
                    }
                })
        },
        methods: {
            ...mapMutations([
                'updateFromPush'
            ]),
            handleItem (tech) {
                if (tech.choosen) {
                    tech.choosen = false;
                    return;
                }
                this.techList = this.techList.map(_tech => {
                    _tech.choosen = _tech.EmployeeID === tech.EmployeeID ? true : false;
                    return _tech;
                })
            },
            startUp () {
                const anotherTech = this.techList.find(tech => tech.choosen === true) || {};
                const postData = {
                    processId: this.pId,
                    roId: this.roId,
                    techId: this.me.techId,
                    techId2: anotherTech.EmployeeID,
                    techName: this.me.techName,
                    techName2: anotherTech.EmployeeName
                };
                 processStartUp(postData)
                    .then(res => {
                        if (res.code === 10000) {
                            this.updateFromPush({ content: res.data, crudType: 3 });
                            this.$router.go(-1);
                        }
                    });
            },
            detailGo () {
                this.$router.go(-1);
            },

        },
        components: {

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"
    @import "../../styles/Btn.styl"

    .container
        padding: .2rem
        font-size .16rem
        color #000000
        .title
            margin-bottom .2rem
        .note
            margin-bottom .1rem
        .technician-list
            margin-bottom .2rem
        .technician-list, .btn-group
            overflow hidden
        .technician-item
            float left
            width 47%
            box-sizing border-box
            margin-right .15rem
            &:nth-child(even)
                margin-right 0
            padding 0 .1rem
            line-height .38rem
            background-color #f9f9f9
            border 1px solid #e1e1e1
            co-flex(space-between)
            margin-bottom .12rem

        .icon-check
            width auto;
            height .25rem;
            color #ccc

        .item-checked
            border 1px solid co-blue
            .icon-check
                color co-blue






</style>