<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'

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
