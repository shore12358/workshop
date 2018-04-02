<template>
    <div>
        <Searchbar></Searchbar>
        <MainCard :oCs="getOrderCounts" :pD="paintData"></MainCard>
        <DashboardList></DashboardList>
    </div>
</template>

<script>
    import MainCard from './MainCard'
    import DashboardList from './DashboardList'
    import Searchbar from './Searchbar'
    import { mapGetters } from 'vuex'
    import { getPaintsStatus } from '../../api/Api';

    export default {
        name: 'dashboard',
        data () {
            return {
                paintData: {},
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
            getPaintsStatus()
                .then(res => {
                    if (res.code == 10000) {
                        this.paintData = res.data;
                    }
                })
        }
    }
</script>

<style lang="stylus" scoped>

</style>