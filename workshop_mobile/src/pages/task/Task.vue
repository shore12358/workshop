<template>
    <div class="container">
        <OrderCardTabs></OrderCardTabs>
        <OrderCard></OrderCard>
    </div>
</template>

<script>
    import OrderCard from '../../components/OrderCard'
    import OrderCardTabs from '../../components/OrderCardTabs'
    import { mapGetters } from 'vuex'

    export default {
        name: 'task',
        data () {
            return {
                orders: []
            }
        },
        // computed: {
        //     ...mapGetters([
        //         'getOrdersByProcessId'
        //     ])
        // },
        created () {
            console.log('created task')
            debugger
            const lineOrders = this.$store.getters.getOrdersByProcessId(0)(1);
            console.log(lineOrders)
        },
        mounted () {
            console.log('mounted task')

        },
        components: {
            OrderCard,
            OrderCardTabs
        },
        methods:{

        }    
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0 0.11rem

                        
          
        
      
    
  
</style>