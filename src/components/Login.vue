<template>
  <div id="root">
    <h1>Amazing Login Screen!</h1>
    <div id="box">
      <label for="username">Username</label>
      <input v-model=userName type="text" name="username" id="username"><br>
      <label for="password">Password</label>
      <input v-model=password type="password" name="pass" id="pass"><br>
      <input v-on:click="clickHandler" type="submit" value="Login">
      <router-link to="register" tag=button>Register</router-link>
      <p  v-if="message" id="message">{{message}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userName: '',
      password: '',
      message: ''
    }
  },
  methods: {
    clickHandler: function () {
      // check if username exists.  If it does check password.  If correct login else print WRONG!
      if (this.password.length > 0) {
        axios.post('http://localhost:3000/login', {
          userName: this.userName,
          password: this.password
        })
          .then(response => {
            if (response.data) {
              localStorage.setItem('username', this.userName)
              this.$router.push('/')
            }
          })
          .catch((error) => {
            this.message = 'An error occurred'
            console.error(error)
          })
      }
    }
  }
}
</script>

<style scoped>
  #root {
    padding: 0px 10px 10px 10px;
    background-color: #eeeeee;
    margin: auto;
    width: fit-content;
  }

  #message {
    color: red;
  }
</style>
