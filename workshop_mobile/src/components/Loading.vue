<template>
    <div class="loading-container" v-show="loading">
        <img src="https://img2.tuhu.org/PeccancyCheXingYi/700b/6b53/3b3884a8f2b32d8911e0c220_w200_h200.png@100Q.png"></img>
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