import Vuex from 'vuex'

import auth from './auth.js'
import todo from './todo.js'
import user from './user.js'
import common from './common.js'

export default new Vuex.Store({
    modules: {
        auth,
        todo,
        user,
        common,
    }
})
