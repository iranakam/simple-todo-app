import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'

import Axios from '../axios.js'

import {
    SET_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    INPUT_REGISTRATION_TITLE,
    INPUT_REGISTRATION_DEADLINE,
    INPUT_EDIT_TITLE,
    INPUT_EDIT_DEADLINE,
    INPUT_REGISTRATION_IS_ACTIVE,
    INPUT_EDIT_IS_ACTIVE,
    INPUT_EDIT_INDEX,
    INPUT_DELETION_IS_ACTIVE,
    INPUT_DELETION_INDEX,
} from './mutation.type.js'

Vue.use(Vuex)

const state = {
    todos: [
    ],
    registration: {
        isActive: false,
        title: '',
        deadline: '',
    },
    edit: {
        isActive: false,
        index: '',
        title: '',
        deadline: '',
    },
    deletion: {
        isActive: false,
        index: '',
    }
}

const mutations = {
    [SET_TODOS] (state, value) {
        state.todos = value
    },
    [ADD_TODO] (state, value) {
        state.todos.push(value)
    },
    [REMOVE_TODO] (state, value) {
        state.todos.splice(value, 1)
    },
    [UPDATE_TODO] (state, { index, value }) {
        state.todos[index] = value
    },
    [INPUT_REGISTRATION_TITLE] (state, value) {
        state.registration.title = value
    },
    [INPUT_REGISTRATION_DEADLINE] (state, value) {
        state.registration.deadline = value
    },
    [INPUT_REGISTRATION_IS_ACTIVE] (state, value) {
        state.registration.isActive = value
    },
    [INPUT_EDIT_TITLE] (state, value) {
        state.edit.title = value
    },
    [INPUT_EDIT_DEADLINE] (state, value) {
        state.edit.deadline = value
    },
    [INPUT_EDIT_IS_ACTIVE] (state, value) {
        state.edit.isActive = value
    },
    [INPUT_EDIT_INDEX] (state, value) {
        state.edit.index = value
    },
    [INPUT_DELETION_IS_ACTIVE] (state, value) {
        state.deletion.isActive = value
    },
    [INPUT_DELETION_INDEX] (state, value) {
        state.deletion.index = value
    },
}

const actions = {
    setTodos (context) {
        Axios.get('/todos').then(function(r) {
            context.commit(SET_TODOS, r.data)
        })
    },
    addTodo (context) {
        const { title, deadline } = context.state.registration
        Axios.post('/todos', { title, deadline, is_done: false }).then(function(r) {
            context.commit(ADD_TODO, r.data)
            context.commit(INPUT_REGISTRATION_TITLE, '')
            context.commit(INPUT_REGISTRATION_DEADLINE, '')
            context.commit(INPUT_REGISTRATION_IS_ACTIVE, false)
        })
    },
    updateTodo (context) {
        const index = context.state.edit.index
        const todo = context.state.todos[index]
        todo.title = context.state.edit.title
        todo.deadline = context.state.edit.deadline
        Axios.put(`/todos/${todo.id}`, todo).then(function() {
            context.commit(UPDATE_TODO, {index, value: todo})
            context.commit(INPUT_EDIT_TITLE, '')
            context.commit(INPUT_EDIT_DEADLINE, '')
            context.commit(INPUT_EDIT_IS_ACTIVE, false)
            context.commit(INPUT_EDIT_INDEX, '')
        })
    },
    updateTodoIsDone (context, index) {
        const todo = context.state.todos[index]
        todo.is_done = !todo.is_done
        Axios.put(`/todos/${todo.id}`, todo).then(function() {
            context.commit(UPDATE_TODO, {index, value: todo})
        })
    },
    removeTodo (context) {
        const index = context.state.deletion.index
        const todo = context.state.todos[index]
        Axios.delete(`/todos/${todo.id}`).then(function() {
            context.commit(REMOVE_TODO, index)
            context.commit(INPUT_DELETION_IS_ACTIVE, false)
            context.commit(INPUT_DELETION_INDEX, '')
        })
    },
    openConfirmDialog (context, index) {
        context.commit(INPUT_DELETION_IS_ACTIVE, true)
        context.commit(INPUT_DELETION_INDEX, index)
    },
    closeConfirmDialog (context) {
        context.commit(INPUT_DELETION_IS_ACTIVE, false)
        context.commit(INPUT_DELETION_INDEX, '')
    },
    openRegistrationForm (context) {
        return new Promise((resolve) => {
            context.commit(INPUT_REGISTRATION_IS_ACTIVE, true)
            resolve()
        })
    },
    closeRegistrationForm (context) {
        context.commit(INPUT_REGISTRATION_TITLE, '')
        context.commit(INPUT_REGISTRATION_DEADLINE, '')
        context.commit(INPUT_REGISTRATION_IS_ACTIVE, false)
    },
    openEditForm (context, index) {
        context.commit(INPUT_EDIT_INDEX, index)
        context.commit(INPUT_EDIT_IS_ACTIVE, true)
        context.commit(INPUT_EDIT_TITLE, context.state.todos[index].title)
        context.commit(INPUT_EDIT_DEADLINE, context.state.todos[index].deadline)
    },
    closeEditForm (context) {
        context.commit(INPUT_EDIT_INDEX, '')
        context.commit(INPUT_EDIT_IS_ACTIVE, '')
        context.commit(INPUT_EDIT_TITLE, '')
        context.commit(INPUT_EDIT_DEADLINE, '')
    },
    updateRegistrationTitle (context, value) {
        context.commit(INPUT_REGISTRATION_TITLE, value)
    },
    updateRegistrationDeadline (context, value) {
        context.commit(INPUT_REGISTRATION_DEADLINE, value)
    },
    updateRegistrationIsActive (context, value) {
        context.commit(INPUT_REGISTRATION_IS_ACTIVE, value)
    },
    updateEditTitle (context, value) {
        context.commit(INPUT_EDIT_TITLE, value)
    },
    updateEditDeadline (context, value) {
        context.commit(INPUT_EDIT_DEADLINE, value)
    },
    updateEditIsActive (context, value) {
        context.commit(INPUT_EDIT_IS_ACTIVE, value)
    },
    updateEditIndex (context, value) {
        context.commit(INPUT_EDIT_INDEX, value)
    },
    updateDeletionIsActive (context, value) {
        context.commit(INPUT_DELETION_IS_ACTIVE, value)
    },
    updateDeletionIndex (context, value) {
        context.commit(INPUT_DELETION_INDEX, value)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
