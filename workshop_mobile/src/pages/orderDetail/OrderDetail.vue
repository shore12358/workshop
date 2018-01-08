<template>
    <Nav></Nav>
</template>

<script>
    import Nav from './nav';

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
            Nav
        }

    }
</script>

<style lang="stylus" scoped>

</style>