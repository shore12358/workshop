<template>
    <div class="loading-container" v-show="loading">
        <img src="https://img1.tuhu.org/PeccancyCheXingYi/ccf7/5073/e7a4403388d97cf524419e32_w200_h200.png@100Q.png"></img>
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