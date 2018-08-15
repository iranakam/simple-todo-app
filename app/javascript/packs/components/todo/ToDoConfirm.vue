<template>
<div
  class='modal'
  v-if='deletionIsActive'
  v-bind:class="{'is-active': deletionIsActive}"
>
  <div
    class='modal-background'
    v-on:click='closeConfirmDialog()'
  >
  </div>
  <div class='modal-content'>
    <div class='notification'>
      <form
        v-on:submit.prevent='removeTodo()'
      >
        <p>Are you sure you want to delete?</p>
        <br>
        <div class='control'>
          <button
            class='button'
            type='submit'
          >
            Delete
          </button>
          <button
            class='button'
            type='button'
            v-on:click='closeConfirmDialog()'
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

import store from '../../store/main'
import { mapActions } from 'vuex'

export default {
  name: 'confirm-item',
  computed: {
    deletionIsActive: {
      get() {
        return this.$store.state.todo.deletion.isActive
      },
    },
  },
  methods: {
    ...mapActions(
      'todo',
      [
        'removeTodo',
      ]
    ),
    closeConfirmDialog: function() {
      this.$store.dispatch('todo/closeConfirmDialog')
    }
  },
}
</script>
