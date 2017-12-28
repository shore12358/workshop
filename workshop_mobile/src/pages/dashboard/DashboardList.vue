<template>
    <div class="container">

        <div class="card">
            <div class="left">等待施工车辆</div>
            <ul class="right">
                <li class="pending">
                    等待中
                    <p>15</p>
                </li>
                <li class="working">
                    施工中
                    <p>22</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboardList',
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/Util.styl"

    .container
        padding 0.16rem
    .card
        height 0.44rem
        shadow-box()
        border-left 0.04rem solid co-blue
        co-flex(sapce-between)
        text-dark()
        .left, .right
            flex 1
        .left
            padding-left 0.2rem
        .right
            co-flex()
            justify-content flex-end
            text-light(0.1rem)
            padding-right 0.2rem
            .pending, .working
                text-align center
                p
                    font-size 0.16rem
                    margin-top 0.05rem

            .pending
                border-right 1px solid co-grey
                margin-right 0.1rem
                padding-right 0.1rem
                p
                    color co-red
            .working
                p
                    color co-blue-bright




</style>