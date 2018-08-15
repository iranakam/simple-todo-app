import Vue from 'vue/dist/vue.esm.js'

import 'bulma/css/bulma.css'

import router from './routes.js'
import store from './store/main.js'

import Header from './components/common/Header'
import Footer from './components/common/Footer'

Vue.component('header-item', Header)
Vue.component('footer-item', Footer)

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: '#app',
        store,
        router,
    })
})
