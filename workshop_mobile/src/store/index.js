import Vue from 'vue'
import Vuex from 'vuex'

// import dashboard from 'Dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }

})