<template>
    <div>
        <Nav></Nav>
        <Detail></Detail>
    </div>
</template>

<script>
    import Nav from './Nav';
    import Detail from './Detail';

    export default {
        name: 'orderDetail',
        data () {
            return {

            }
        },
        computed: {
            orderId () {
                return this.$route.params.id;
            },
            processStatus () {
                return this.$route.query.processStatus;
            },
            processId () {
                return this.$route.query.processId
            }
        },
        created () {

        },
        components: {
            Nav,
            Detail
        }

    }
</script>

<style lang="stylus" scoped>

</style>