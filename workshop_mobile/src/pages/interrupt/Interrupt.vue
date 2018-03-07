<template>
    <div class="container">
        <Multiselect v-model.trim="selectReason" :options="interruptOptions" placeholder="选择中断原因" :searchable="false" :close-on-select="true" :show-labels="false" class="selectReason" :allow-empty="false"></Multiselect>
        <div class="input-wrapper">
            <textarea id="reason-input" placeholder="请输入中断原因（限150字）" v-model.trim="inputReason" @keyup="keyup" :disabled="!selectReason"></textarea>
            <div class="tip"><span :class="`${inputReason.length === 150 ? 'tip-red' : ''}`">{{inputReason.length}}</span>/{{150 - inputReason.length}}</div>
        </div>
        <Toast :text="toast_conf.text" v-show="toast_conf.shown"></Toast>
        <div class="btn-group">
            <div class="btn btn-default" @touchstart="detailGo">取消</div>
            <div class="btn btn-confirm" @touchstart="validate">确定</div>
        </div>
    </div>
</template>
<script>
    import { queryItemMasters, pauseProcess } from '../../api/Api';
    import { mapMutations } from 'vuex';

    export default {
        name: 'interrupt',
        data () {
            return {
                interruptOptions: [],
                selectReason: '',
                inputReason: '',
                toast_conf: {
                    text: '',
                    shown: false
                },
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
            Bu.setHeadline('中断操作原因');
            queryItemMasters(2)
                .then(res => {
                    if (res.code === 10000) {
                        this.interruptOptions = res.data.map(item => item.itemName);
                    }
                });
        },
        methods: {
            ...mapMutations([
                'updateFromPush'
            ]),
            detailGo () {
                this.$router.go(-1);
            },
            keyup () {
                if (this.inputReason.length > 150) {
                    this.inputReason = this.inputReason.slice(0, 150);
                }
            },

            showToast (text) {
                this.toast_conf = Object.assign({}, { text, shown: true });
                setTimeout(() => {
                    this.toast_conf = Object.assign(this.toast_conf, { shown: false });
                }, 1500);
            },
            validate () {
                const _selectReason = ['其他', '其它'].indexOf(this.selectReason) > -1 ? '其它' : this.selectReason;
                switch (_selectReason) {
                    case '其它':
                        if (this.inputReason.length >= 4) {
                            this.interrupt(this.inputReason);
                        } else {
                            this.showToast(`未达到<br/>输入字数`);
                        }
                        break;
                    case '':
                        this.showToast(`请选择<br/>或输入原因`);
                        break;
                    default:
                        if (this.inputReason && this.inputReason.length < 4) {
                            this.showToast(`未达到<br/>输入字数`)
                            break;
                        }
                        this.interrupt(`${_selectReason},${this.inputReason}`);
                }

            },
            interrupt (reason) {
                const postData = {
                    remark: reason,
                    processId: this.pId,
                    roId: this.roId,
                };
                pauseProcess(postData)
                    .then(res => {
                        if (res.code === 10000) {
                            this.updateFromPush({ content: res.data, crudType: 3 });
                            this.$router.go(-1);
                        }
                    })

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
    .tip-red
        color co-red
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