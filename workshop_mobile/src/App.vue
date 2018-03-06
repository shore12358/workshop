<template>
  <div id="app">
    <Connecting v-if="this.getPushInfo.active === false" :title="connect_conf.title" :text="connect_conf.text"></Connecting>
    <router-view></router-view>
  </div>
</template>

<script>
    import { mapActions, mapMutations, mapGetters } from 'vuex'
    import { getProcessListByTechId } from './api/Api';
    import Connecting from './components/Connecting';
    import io from 'socket.io-client';

    export default {
        name: 'app',
        data () {
            return {
              connect_conf: {
                  title: "页面连接中...",
                  text: "稍等片刻，<br>连接成功后弹窗将自动关闭"
              },
//              reload_conf: {
//                  title: "已中断...",
//                  text: "您已使用<br>其他移动设备登录"
//              }
            }
        },
        computed: {
            ...mapGetters([
                'getPushInfo',
            ]),
        },
        created () {
            this.initAsync();
            this.fetchLineListAsync();
            this.initSocket();

            getProcessListByTechId()
                .then(res => {
                    Bu.st.setKey('myProcessList', res.data);
                });

        },
        components: {
            Connecting,
        },
        methods: {
            ...mapActions([
                'initAsync',
                'fetchLineListAsync',
            ]),
            ...mapMutations([
                'updatePushInfo',
                'updateFromPush'
            ]),
            initSocket () {
                Bu.st.getToken()
                    .then(token => {
                        const socket = io(`https://comet.tuhu.cn/banpen`, {
//                        const socket = io(`https://comet.tuhu.work/banpen`, {
                            query: {
                                token,
                                channel: 'banpen',
                                ua: 'h5',
                                module: 'tab'
                            }
                        });
                        socket.on('connect', () => {
                            console.log('socket connected with sokcetId: ' + socket.id);
                        });
                        socket.on('disconnect', () => {
                            console.log('disconnect');
                            this.updatePushInfo({ active: false });

                        });
                        socket.on('reconnect_attempt', () => {
                            const token = Bu.st.getTokenSync();
                            socket.io.opts.query = {
                                token,
                                channel: 'banpen',
                                ua: 'h5',
                                module: 'tab'
                            };
                            console.log('reconnect use token: ' + token);
                        });
                        socket.on('PushMessage', msg => {

                            const message = JSON.parse(msg);
                            const version = Number(message.version);
                            const versionKey = message.type.trim() + 'Version';
                            const _obj = { active: true };
                            _obj[versionKey] = version;

                            this.getPushInfo[versionKey] + 1 < version && this.initAsync();
                            this.updatePushInfo(_obj);
                            this.updateFromPush(message.msg);
                            console.log("PushMessage", msg);

                        });
                        socket.on('PushVersion', msg => {
                            const messages = JSON.parse(msg);
                            const _obj = { active: true };
                            let refreshed = false;

                            messages.forEach(msg => {
                                const version = Number(msg.version);
                                const versionKey = msg.type.trim() + 'Version';
                                _obj[versionKey] = version;
                                if (!refreshed && Object.keys(this.getPushInfo).length && (this.getPushInfo[versionKey] + 1 < version)) {
                                    this.initAsync();
                                    refreshed = true;
                                }
                            });

                            this.updatePushInfo(_obj);

                            console.log("current state", msg);
                        });

                        socket.on('error', msg => {
                            console.log(`error ${msg}`);
                            try {
                                if (JSON.parse(msg).statusCode == 401) {
                                    Bu.st.fetchToken();
                                    socket.open();
                                    console.log('invalid token, socket waiting to reopen...');
                                }
                            } catch (e) {

                            }

                        });
                    });
            },
        },

    }
</script>

<style lang="stylus">
  @import "./styles/Common.styl"

</style>
