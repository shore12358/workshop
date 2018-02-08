<template>
  <div id="app">
    <Connecting v-if="this.getPushInfo.active === false"></Connecting>
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

            Bu.st.getTechInfo()
                .then(techInfo => {
                    Bu.setHeadline(techInfo.shopName);
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
                        const socket = io(`https://comet.tuhu.work/banpen?token=${token}&channel=banpen&ua=h5&module=tab`);
                        socket.on('connect', () => {
                            console.log('socket connected');
                        });
                        socket.on('disconnect', () => {
                            console.log('disconnect');
                            this.updatePushInfo({ active: false });

                        });
                        socket.on('PushMessage', msg => {

                            const message = JSON.parse(msg);
                            const version = Number(message.version);
                            const versionKey = message.type.trim() + 'Version';
                            const _obj = { active: true };
                            _obj[versionKey] = version;

                            this.updatePushInfo(_obj);
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
                        });
                    });
            },
        },

    }
</script>

<style lang="stylus">
  @import "./styles/Common.styl"

</style>
