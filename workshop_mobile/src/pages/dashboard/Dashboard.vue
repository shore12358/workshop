<template>
    <div>
        <MainCard></MainCard>
        <Tabs></Tabs>
        <DashboardList></DashboardList>
        <!--<icon name="flag"></icon>-->
    </div>
</template>

<script>
    import MainCard from './MainCard'
    import Tabs from '../../components/Tabs'
    import DashboardList from './DashboardList'
//    import icon from 'vue-awesome/components/Icon'
    export default {
        name: 'dashboard',
        components: {
            MainCard,
            Tabs,
            DashboardList
        }
    }
</script>

<style lang="stylus" scoped>

</style>