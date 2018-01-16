<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import bridge from './utils/bridge';

    export default {
        name: 'app',
        data () {
            return {

            }
        },
        created () {
            this.initAsync();
            this.fetchLineListAsync();
            // this.updateFromPushAsync()

            window.localStorage.setItem('techId', 123456);

            // window.technicianBack = (res) => {
            //     window.localStorage.setItem('userInfo', JSON.stringify(res));
            // };
            //
            // bridge.go('getTechnicianInfo', { params: '' }, 'technicianBack');

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
