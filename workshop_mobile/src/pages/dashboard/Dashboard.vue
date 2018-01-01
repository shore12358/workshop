<template>
    <div>
        <Searchbar></Searchbar>
        <MainCard></MainCard>
        <DashboardList></DashboardList>
    </div>
</template>

<script>
    import MainCard from './MainCard'
    import DashboardList from './DashboardList'
    import Searchbar from './Searchbar'

    export default {
        name: 'dashboard',
        created () {
            console.log('created db')
        },
        mounted () {
            console.log('mounted db')

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