<template>
    <div>
        <Searchbar></Searchbar>
        <MainCard></MainCard>
        <Tabs></Tabs>
        <DashboardList></DashboardList>
    </div>
</template>

<script>
    import MainCard from './MainCard'
    import Tabs from '../../components/Tabs'
    import DashboardList from './DashboardList'
    import Searchbar from './Searchbar'

    export default {
        name: 'dashboard',
        components: {
            MainCard,
            Tabs,
            DashboardList,
            Searchbar
        }
    }
</script>

<style lang="stylus" scoped>

</style>