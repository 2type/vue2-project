import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        exampleCount: 0
    },
    mutations: {
        exampleIncrement (state) {
            state.exampleCount++
        }
    },
    modules: {

    }
})