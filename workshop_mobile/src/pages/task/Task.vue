<template>
    <div class="container">
        <OrderCard></OrderCard>
    </div>
</template>

<script>
    import OrderCard from '../../components/OrderCard'

    export default {
        name: 'task',
        data () {
            return{

            }
        },
        components: {
            OrderCard
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