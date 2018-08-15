import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'

import store from '../store/main'

import {
    INPUT_REGISTRATION_EMAIL,
    INPUT_REGISTRATION_PASSWORD,
    INPUT_REGISTRATION_PASSWORD_CONFIRMATION
} from './mutation.type.js'

import Axios from '../axios.js'

Vue.use(Vuex)

const state = {
    registration: {
        email: '',
        password: '',
        passwordConfirmation: '',
    },
}

const mutations = {
    [INPUT_REGISTRATION_EMAIL] (state, email) {
        state.registration.email = email
    },
    [INPUT_REGISTRATION_PASSWORD] (state, password) {
        state.registration.password = password
    },
    [INPUT_REGISTRATION_PASSWORD_CONFIRMATION] (state, passwordConfirmation) {
        state.registration.passwordConfirmation = passwordConfirmation
    },
}

const actions = {
    createUser (context) {
        return new Promise((resolve) => {
            const { email, password, passwordConfirmation } = context.state.registration
            Axios.post('/signup', { user: { email, password, password_confirmation: passwordConfirmation } }).then(() => {
                store.dispatch('auth/updateRegistrationEmail', email)
                store.dispatch('auth/updateRegistrationPassword', password)
                store.dispatch('auth/createToken').then(function() {
		    context.commit(INPUT_REGISTRATION_EMAIL, '')
		    context.commit(INPUT_REGISTRATION_PASSWORD, '')
		    context.commit(INPUT_REGISTRATION_PASSWORD_CONFIRMATION, '')
                    resolve()
                })
            }).catch((error) => {
                if (error.response) {
                    alert('Sign up failed.')
                } else if (error.message) {
                    alert('Network error.')
                } else {
                    alert('Unknown error.')
                }
                resolve()
            })
        })
    },
    updateRegistrationEmail (context, value) {
        context.commit(INPUT_REGISTRATION_EMAIL, value)
    },
    updateRegistrationPassword (context, value) {
        context.commit(INPUT_REGISTRATION_PASSWORD, value)
    },
    updateRegistrationPasswordConfirmation (context, value) {
        context.commit(INPUT_REGISTRATION_PASSWORD_CONFIRMATION, value)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
