<template>
    <div>
        <Searchbar></Searchbar>
        <MainCard :oCs="getOrderCounts"></MainCard>
        <DashboardList></DashboardList>
    </div>
</template>

<script>
    import MainCard from './MainCard'
    import DashboardList from './DashboardList'
    import Searchbar from './Searchbar'
    import { mapActions, mapGetters } from 'vuex'

    let storage = window.localStorage;

    export default {
        name: 'dashboard',
        data () {
            return {

            }
        },
        created () {
            this.initAsync();

        },
        mounted () {
            // this.updateFromPushAsync();
        },
        computed: {
            ...mapGetters([
                'getOrderCounts'
            ])
        },
        methods: {
            ...mapActions([
                'initAsync',
                'updateFromPushAsync'
            ]),
        },
        components: {
            MainCard,
            DashboardList,
            Searchbar
        }
    }
</script>

<style lang="stylus" scoped>

</style>