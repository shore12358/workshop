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
        computed: {
            ...mapGetters([
                'getOrdersByLineId'
            ])
        },
        created () {
            console.log('created task')
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