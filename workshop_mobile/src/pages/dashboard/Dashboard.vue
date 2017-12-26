<template>
    <div>
        <Dashboard></Dashboard>
        <router-link to="/">Go to dashboard</router-link>
        <router-link to="/task">Go to task</router-link>
    </div>
</template>

<script>
    import Dashboard from './MainCard'
    export default {
        name: 'dashboard',
        components: {
            Dashboard
        }
    }
</script>

<style lang="stylus" scoped>

</style>