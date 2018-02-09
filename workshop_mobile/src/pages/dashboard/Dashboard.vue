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
    import { mapGetters } from 'vuex'

    export default {
        name: 'dashboard',
        data () {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'getOrderCounts'
            ])
        },
        components: {
            MainCard,
            DashboardList,
            Searchbar
        },
        created () {
            Bu.st.getTechInfo()
                .then(techInfo => {
                    Bu.setHeadline(techInfo.shopName);
                });
        }
    }
</script>

<style lang="stylus" scoped>

</style>