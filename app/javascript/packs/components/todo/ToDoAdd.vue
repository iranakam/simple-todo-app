<template>
<div>
  <div
    class='columns is-mobile'
    v-if='!registrationIsActive'
  >
    <div
      class='column is-12-desktop is-12-tablet is-12-mobile'
      v-on:click='openRegistrationForm()'
    >
      <span><a class='add-button'>Add Todo</a></span>
    </div>
  </div>
  <div
    class='columns is-mobile'
    v-if='registrationIsActive'
  >
    <form
      class='column'
      v-on:submit.prevent='addTodo()'
    >
      <div class='field has-addons'>
        <div class='control'>
          <input
            class='input'
            type='text'
            v-model='registrationTitle'
            required
            ref='add'
          >
        </div>
        <div class='control'>
          <datepicker
            placeholder="Y-m-d"
            :config="{ dateFormat: 'Y-m-d', static: true }"
            v-model='registrationDeadline'
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
          v-on:click='closeRegistrationForm()'
        >
          Cancel
        </button>
      </div>
    </form>
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
  name: 'add-item',
  computed: {
    registrationIsActive: {
      get() {
        return this.$store.state.todo.registration.isActive
      },
    },
    registrationTitle: {
      get() {
        return this.$store.state.todo.registration.title
      },
      set(value) {
        this.$store.dispatch('todo/updateRegistrationTitle', value)
      }
    },
    registrationDeadline: {
      get() {
        return this.$store.state.todo.registration.deadline
      },
      set(value) {
        this.$store.dispatch('todo/updateRegistrationDeadline', value)
      }
    },
  },
  methods: {
    ...mapActions(
      'todo',
      [
        'addTodo'
      ]
    ),
    openRegistrationForm: function() {
      this.$store.dispatch('todo/openRegistrationForm').then(() => {
        this.$nextTick(function() {
          this.$refs.add.focus()
        })
      })
    },
    closeRegistrationForm: function() {
      this.$store.dispatch('todo/closeRegistrationForm')
    },
    toLocaleString: function(date) {
      return Moment(new Date(date)).fromNow()
    },
  },
}
</script>
