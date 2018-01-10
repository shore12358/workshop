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
