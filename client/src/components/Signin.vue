<template>
  <div>
  <div id="signin">
    <h2>Sign In</h2>
    <input type="text" placeholder="email" v-model="email"> <br>
    <input type="password" placeholder="password" v-model="password"> <br>
    <button @click="signin">Sign In</button>
    <p>
      Do not have an account? You can <router-link to="/signup">create one</router-link>
    </p>
  </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Signin',
    data: function () {
      return {
        loading: false,
        email: '',
        password: ''
      }
    },
    methods: {
      signin: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('home')
        })
        .catch(err => {
          alert('Ooops! ' + err.message)
        })
      }
    }
  }
</script>
<style scoped>
</style>
