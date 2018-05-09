<template>
    <div>
        <Tabs :focusIndex="focusIdx"></Tabs>
        <router-view></router-view>
    </div>

</template>

<script>
    import Tabs from '../components/Tabs'

    export default {
        name: 'init',
        components: {
            Tabs
        },
        data () {
            return {
                focusIdx: this.$route.name === 'dashboard' ? 0 : 1
            }
        },
        beforeRouteUpdate (to, from, next) {
            if (to.name !== from.name) {
                this.focusIdx = to.name === 'dashboard' ? 0 : 1;
            }
            next();
        },


    }
</script>