<template>
    <transition name="fade">
        <div class="f-toast f-toast-tip" v-html="text"></div>
    </transition>
</template>
<script>
    export default {
        name: 'toast',
        data () {
            return {

            }
        },
        props: ['text'],

    };
</script>
<style lang="stylus" scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

</style>