<template>
<header>
  <nav class='navbar'>
    <div class='container'>
      <div class='navbar-brand'>
        <router-link
          class='navbar-item'
          to='/'
        >
          Todo
        </router-link>
        <a
          role='button'
          class='navbar-burger'
          target='navBarMenu'
          v-on:click='inputHeaderIsA'
          v-bind:class="{'is-active': isActive}"
        >
          <span></span>
          <span></span>
        </a>
      </div>
      <div
        id='navbarMenu'
        class='navbar-menu'
        v-bind:class="{'is-active': isActive}"
      >
        <div class='navbar-end'>
          <router-link
            class='navbar-item'
            v-if='!auth.status'
            to='/signin'
          >
            Sign In
          </router-link>
          <router-link
            class='navbar-item'
            v-if='!auth.status'
            to='/signup'
          >
            Sign Up
          </router-link>
          <a
            class='navbar-item'
            v-if='auth.status'
            v-on:click='destroyToken()'
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  </nav>
</header>
</template>

<script>
export default {
  name: 'header-item',
  watch: {
    '$route' () {
      this.isActive = false
    },
  },
  computed: {
    auth() {
      return this.$store.state.auth.token
    },
    isActive: {
      get() {
        return this.$store.state.common.header.isActive
      },
      set(value) {
        this.$store.dispatch('common/inputHeaderIsActive', value)
      },
    },
  },
  methods: {
    destroyToken: function() {
      this.$store.dispatch('auth/destroyToken').then(() => {
        this.$router.push('/signin')
      })
    },
    inputHeaderIsA: function() {
      this.$store.dispatch('common/inputHeaderIsActive', !this.isActive)
    },
  }
}
</script>
