<template>
    <div class="loading-container" v-show="loading">
        <img src="../images/loading-dark.png"></img>
    </div>
</template>
<script>
    export default {
        name: 'loading',
        props: ['loading'],
    };
</script>

<style lang="stylus" scoped>

    .loading-container
        margin-bottom .05rem
        text-align center
        img
            width .3rem;
            animation .8s rotate infinite;

</style>