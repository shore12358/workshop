import Vuex from 'vuex'
import dashboard from 'Dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dashboard
    }
})