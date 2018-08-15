import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'

import {
    INPUT_HEADER_IS_ACTIVE,
} from './mutation.type.js'

Vue.use(Vuex)

const state = {
    header: {
        isActive: false,
    },
}

const mutations = {
    [INPUT_HEADER_IS_ACTIVE] (state, value) {
        state.header.isActive = value
    },
}

const actions = {
    inputHeaderIsActive (context, value) {
        context.commit(INPUT_HEADER_IS_ACTIVE, value)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
