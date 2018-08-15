<template>
<section class='section'>
  <div class='columns'>
    <form
      class='column is-6-desktop is-8-tablet is-10-mobile is-offset-3-desktop is-offset-2-tablet is-offset-1-mobile'
      v-on:submit.prevent='createUser()'
    >
      <div class='field'>
        <div class='control has-icons-left'>
          <input
            class='input'
            type='email'
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
        <div class='control has-icons-left'>
          <input
            class='input'
            type='password'
            v-model='passwordConfirmation'
            placeholder='Password Confirmation'
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
  name: 'signup-item',
  computed: {
    email: {
      get() {
        return this.$store.state.user.registration.email
      },
      set(value) {
        this.$store.dispatch('user/updateRegistrationEmail', value)
      },
    },
    password: {
      get() {
        return this.$store.state.user.registration.password
      },
      set(value) {
        this.$store.dispatch('user/updateRegistrationPassword', value)
      },
    },
    passwordConfirmation: {
      get() {
        return this.$store.state.user.passwordConfirmation
      },
      set(value) {
        this.$store.dispatch('user/updateRegistrationPasswordConfirmation', value)
      },
    },
  },
  methods: {
    createUser() {
        this.$store.dispatch('user/createUser').then(() => {
          this.$router.push('/')
        })
    }
  },
}
</script>
