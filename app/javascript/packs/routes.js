import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import store from './store/main'

Vue.use(VueRouter)

import ToDo from './components/todo/ToDo'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'

const ifAuthorized = (to, from, next) => {
    if (store.state.auth.token.status && store.state.auth.token.expire > Date.now() / 1000) {
        next()
        return
    }
    store.dispatch('auth/destroyToken').then(() => {
        next('/signin')
    })
}

const ifNotAuthorized = (to, from, next) => {
    if (!store.state.auth.token.status) {
        next()
        return
    }
    next('/')
}

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: ToDo,
            beforeEnter: ifAuthorized
        },
        {
            path: '/signin',
            component: SignIn,
            beforeEnter: ifNotAuthorized
        },
        {
            path: '/signup',
            component: SignUp,
            beforeEnter: ifNotAuthorized
        },
    ]
})
