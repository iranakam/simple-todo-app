<template>
<div class='columns is-mobile'>
  <confirm-item></confirm-item>
  <section class='column is-6-desktop is-8-tablet is-10-mobile is-offset-3-desktop is-offset-2-tablet is-offset-1-mobile section'>
    <list-item></list-item>
    <add-item></add-item>
  </section>
</div>
</template>

<script>
import Vue from 'vue/dist/vue.esm.js'

import ToDoAdd from './ToDoAdd'
import ToDoList from './ToDoList'
import ToDoConfirm from './ToDoConfirm'

Vue.component('add-item', ToDoAdd)
Vue.component('list-item', ToDoList)
Vue.component('confirm-item', ToDoConfirm)

export default {
  name: 'todo-item',
}
</script>
