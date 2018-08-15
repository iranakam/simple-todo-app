<template>
<section class='section'>
  <div class='columns'>
    <form
      class='column is-6-desktop is-8-tablet is-10-mobile is-offset-3-desktop is-offset-2-tablet is-offset-1-mobile'
      v-on:submit.prevent='createToken()'
    >
      <div class='field'>
        <div class='control has-icons-left'>
          <input
            class='input' type='email'
            v-model='email'
            placeholder='Email'
            required
          >
          <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
        </div>
      </div>
      <div class='field'>
        <div class='control has-icons-left'>
          <input
            class='input'
            type='password'
            v-model='password'
            placeholder='Password'
            required
          >
          <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
        </div>
      </div>
      <div class='field'>
        <div class='control'>
          <button
            class='button'
            type='submit'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</section>
</template>

<script>
import store from '../../store/main'

export default {
  name: 'signin-item',
  computed: {
    email: {
      get() {
        return this.$store.state.auth.registration.email
      },
      set(value) {
        this.$store.dispatch('auth/updateRegistrationEmail', value)
      },
    },
    password: {
      get() {
        return this.$store.state.auth.registration.password
      },
      set(value) {
        this.$store.dispatch('auth/updateRegistrationPassword', value)
      },
    },
  },
  methods: {
    createToken() {
      this.$store.dispatch('auth/createToken').then(() => {
        this.$router.push('/')
      })
    }
  },
}
</script>
