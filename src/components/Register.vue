<template>
  <div id="root">
    <h1>Amazing Register Screen!</h1>
    <div id="box">
      <label for="username">Username</label>
      <input v-model=userName type="text" name="username" id="username">
      <label for="password">Password</label>
      <input v-model=password type="password" name="pass" id="pass">
      <label for="password">Confirm Password</label>
      <input v-model=password_confirm type="password" name="pass_confirm" id="pass_confirm">
    </div>
    <div id="controls">
      <input v-on:click="clickHandler" type="submit" value="Submit">
      <router-link to="login" tag=button>Back</router-link>
      <p v-if="message" id="message">{{message}}</p>
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
      password_confirm: '',
      message: ''
    }
  },
  methods: {
    checkFields: function () {
      if (this.password.length === 0 || this.userName.length === 0) {
        this.message = 'Please enter a valid username and password.'
      } else if (this.password !== this.password_confirm) {
        this.message = 'Passwords do not match.'
      } else {
        return true
      }
    },

    clickHandler: function () {
      // check if username exists.  If it does check password.  If correct login else print WRONG!
      if (this.checkFields()) {
        axios.post('http://localhost:3000/register', {
          userName: this.userName,
          password: this.password
        })
          .then(response => {
            if (response.data) {
              this.message = 'User successfully created.'
            } else {
              this.message = 'Username already taken.'
            }
          })
          .catch((error) => {
            this.message = 'There was error registering'
            console.error(error.response)
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

  #box {
    display: grid;
    grid-template-columns: 33% 66%;
    grid-column-gap: 5px;
  }

  #message {
    color: red;
  }
</style>
