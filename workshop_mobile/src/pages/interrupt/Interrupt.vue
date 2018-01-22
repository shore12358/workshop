<template>
    <div class="container">
        <Multiselect v-model="selectReason" :options="interruptOptions" placeholder="选择中断原因" :searchable="false" :close-on-select="false" :show-labels="false" class="selectReason" :allow-empty="false"></Multiselect>
        <div class="input-wrapper">
            <textarea id="reason-input" placeholder="请输入中断原因（限150字）" v-model="inputReason" @keyup="keyup"></textarea>
            <div class="tip">{{inputReason.length}}/150</div>
        </div>
        <div class="btn-group">
            <div class="btn btn-default" @click="detailGo">取消</div>
            <div class="btn btn-confirm" @click="validate">确定</div>
        </div>
    </div>
</template>
<script>
    import { queryItemMasters, pauseProcess } from '../../api/Api';
    export default {
        name: 'interrupt',
        data () {
            return {
                interruptOptions: [],
                selectReason: '',
                inputReason: ''
            }
        },
        computed: {
            roId () {
                return Number(this.$route.params.oId);
            },
            pId () {
                return Number(this.$route.params.pId);
            },
        },
        created () {
            queryItemMasters(2)
                .then(res => {
                    if (res.code === 10000) {
                        this.interruptOptions = res.data.map(item => item.itemName);
                    }
                });
        },
        methods: {
            detailGo () {
                this.$router.go(-1);
            },
            keyup () {
                if (this.inputReason.length > 150) {
                    this.inputReason = this.inputReason.slice(0, 150);
                }
            },
            validate () {
                const select_reason = this.selectReason.trim();
                switch (select_reason) {
                    case '其他':
                        if (this.inputReason.length >= 4) {
                            this.interrupt(this.inputReason);
                        } else {
                            // TODO: input charactor lengh is not enough
                        }
                        break;
                    case '':
                        // TODO: choose please
                        break;
                    default:
                        this.interrupt(select_reason);
                }

            },
            interrupt (selectReason) {
                const postData = {
                    processId: this.pId,
                    roId: this.roId,
                    ops: selectReason
                };
//                pauseProcess(postData)
//                    .then(res => {
//                        // TODO handel temporary data
//                    })

            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"
    @import "../../styles/Btn.styl"


    pd = .2rem;
    bbc = #e1e1e1
    .container
        padding 0.3rem pd 0
    .input-wrapper
        position relative
    .tip
        position absolute
        bottom d = .1rem
        right d
        color #666
    #reason-input
        border 1px solid bbc
        background-color #f9f9f9
        width 100%
        height 1rem
        box-sizing: border-box;
        padding .1rem
        text-light()
        &::-webkit-input-placeholder
            text-light()

</style>