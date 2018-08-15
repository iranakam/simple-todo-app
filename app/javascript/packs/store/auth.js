import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'

import Axios from '../axios'

import {
    INPUT_REGISTRATION_EMAIL,
    INPUT_REGISTRATION_PASSWORD,
    SET_TOKEN,
    UNSET_TOKEN,
} from './mutation.type.js'

Vue.use(Vuex)

const state = {
    registration: {
        email: '',
        password: '',
    },
    token: {
        token: localStorage.getItem('token') || '',
        status: localStorage.getItem('status') || '',
        expire: localStorage.getItem('expire') || '',
        email: localStorage.getItem('email') || '',
    },
}

const mutations = {
    [SET_TOKEN] (state, value) {
        state.token.token = value.token
        state.token.status = value.status
        state.token.expire = value.expire
        state.token.email = value.email
    },
    [UNSET_TOKEN] (state) {
        state.token.token = ''
        state.token.status = ''
        state.token.expire = ''
        state.token.email = ''
    },
    [INPUT_REGISTRATION_EMAIL] (state, email) {
        state.email = email
    },
    [INPUT_REGISTRATION_PASSWORD] (state, password) {
        state.password = password
    },
}

const actions = {
    createToken (context) {
        return new Promise((resolve) => {
            const { email, password } = context.state
            Axios.post('/signin', {auth: { email, password }}).then((response) => {
                const token = response.data.jwt
                const status = true
                const expire = JSON.parse(window.atob(token.split('.')[1])).exp
                localStorage.setItem('token', token)
                localStorage.setItem('status', status)
                localStorage.setItem('expire', expire)
                Axios.setAuthorization()
                context.commit(SET_TOKEN, { token, status, expire, email })
	        context.commit(INPUT_REGISTRATION_EMAIL, '')
	        context.commit(INPUT_REGISTRATION_PASSWORD, '')
                resolve()
            }).catch((error) => {
                if (error.response) {
                    alert('Sign in failed.')
                } else if (error.message) {
                    alert('Network error.')
                } else {
                    alert('Unknown error.')
                }
            })
        })
    },
    destroyToken (context) {
        localStorage.removeItem('token')
        localStorage.removeItem('status')
        localStorage.removeItem('expire')
        context.commit(UNSET_TOKEN)
    },
    updateRegistrationEmail (context, value) {
        context.commit(INPUT_REGISTRATION_EMAIL, value)
    },
    updateRegistrationPassword (context, value) {
        context.commit(INPUT_REGISTRATION_PASSWORD, value)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
