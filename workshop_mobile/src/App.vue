<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { getProcessListByTechId } from './api/Api';

    export default {
        name: 'app',
        data () {
            return {

            }
        },
        created () {
            this.initAsync();
            this.fetchLineListAsync();
            this.updateFromPushAsync();

            getProcessListByTechId()
                .then(res => {
                    Bu.st.setKey('myProcessList', res.data);
                });

            Bu.st.getTechInfo()
                .then(techInfo => {
                    Bu.setHeadline(techInfo.shopName);
                });
        },
        methods: {
            ...mapActions([
                'initAsync',
                'fetchLineListAsync',
                'updateFromPushAsync'
            ]),
        },

    }
</script>

<style lang="stylus">
  @import "./styles/Common.styl"

</style>
