<template>
<div>
  <div
    v-for='(todo, index) in this.todos'
    :key='todo.id'
  >
    <div
      class='columns is-mobile'
      v-if='!editIsActive || editIndex != index'
      v-bind:class="{'is-done': todo.is_done}"
    >
      <div
        class='column is-1-desktop is-1-tablet is-2-mobile'
      >
        <input
          type="checkbox"
          v-on:click='updateTodoIsDone(index)'
          v-model='todo.is_done'
        >
      </div>
      <div
        class='column is-6-desktop is-6-tablet is-5-mobile'
        v-on:click='openEditForm(index)'
      >
        <span>{{todo.title}}</span>
      </div>
      <div
        class='column is-4-desktop is-4-tablet is-3-mobile'
        v-on:click='openEditForm(index)'
      >
        <span>{{toLocaleString(todo.deadline)}}</span>
      </div>
      <div
        class='column is-1-desktop is-1-tablet is-2-mobile'
        v-on:click='openConfirmDialog(index)'
      >
        <span><a class="delete is-small"></a></span>
      </div>
    </div>
    <div
      class='columns is-mobile'
      v-if='editIsActive && (editIndex == index)'
    >
      <form
        class='column'
        v-on:submit.prevent='updateTodo(index)'
      >
        <div class='field has-addons'>
          <div class='control'>
            <input
              class='input'
              type='text'
              v-model='editTitle'
              required
              ref='hoge'
            >
          </div>
          <div class='control'>
            <datepicker
              placeholder="Y-m-d"
              :config="{ dateFormat: 'Y-m-d', static: true }"
              v-model='editDeadline'
              required
            >
            </datepicker>
          </div>
        </div>
        <div class='control'>
          <button
            class='button'
            type='submit'
          >
            Submit
          </button>
          <button
            class='button'
            type='button'
            v-on:click='closeEditForm()'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue/dist/vue.esm.js'

import Datepicker from 'vue-bulma-datepicker'
import Moment from 'moment'

import store from '../../store/main'
import { mapActions } from 'vuex'

Vue.component('datepicker', Datepicker)

export default {
  name: 'list-item',
  created() {
    this.setTodos()
  },
  computed: {
    todos: {
      get() {
        return this.$store.state.todo.todos
      },
    },
    editIsActive: {
      get() {
        return this.$store.state.todo.edit.isActive
      },
    },
    editIndex: {
      get() {
        return this.$store.state.todo.edit.index
      },
    },
    editTitle: {
      get() {
        return this.$store.state.todo.edit.title
      },
      set(value) {
        this.$store.dispatch('todo/updateEditTitle', value)
      },
    },
    editDeadline: {
      get() {
        return this.$store.state.todo.edit.deadline
      },
      set(value) {
        this.$store.dispatch('todo/updateEditDeadline', value)
      },
    },
  },
  methods: {
    ...mapActions(
      'todo',
      [
        'setTodos',
        'updateTodo',
        'updateTodoIsDone',
      ]
    ),
    openEditForm: function(index) {
      this.$store.dispatch('todo/openEditForm', index).then(() => {
        this.$nextTick(function() {
          this.$refs.hoge[0].focus()
        })
      })
    },
    closeEditForm: function() {
      this.$store.dispatch('todo/closeEditForm')
    },
    openConfirmDialog: function(index) {
      this.$store.dispatch('todo/openConfirmDialog', index)
    },
    toLocaleString: function(date) {
      return Moment(new Date(date)).fromNow()
    },
  },
}

</script>

<style scoped>
.is-done {
    color: red;
}
</style>
