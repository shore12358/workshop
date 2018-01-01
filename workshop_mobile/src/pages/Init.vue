<template>
    <div>
        <Tabs></Tabs>
        <router-view></router-view>
    </div>

</template>

<script>
    import Tabs from '../components/Tabs'

    export default {
        name: 'init',
        components: {
            Tabs
        }

    }
</script>