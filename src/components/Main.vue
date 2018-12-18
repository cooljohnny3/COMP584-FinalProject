<template>
  <div id="root">
    <h1>Amazing Chat Application!</h1>
    <div id="options">
      <input v-model="other_user" type="text">
      <button v-on:click="connect">Connect</button>
    </div>
    <div id="chat">
      <p v-for="(msg, index) in messages" :key="index">{{ msg.from }}: {{ msg.message }}</p>
    </div>
    <div v-if="socket != ''" id="controls">
      <p>{{user}}</p>
      <input v-model="message" type="text" name="input" id="input">
      <input v-on:click="sendMessage" type="button" value="Send">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'

export default {
  name: 'Main',
  data: function () {
    return {
      user: localStorage.getItem('username'),
      other_user: '',
      message: '',
      messages: [],
      socket: ''
    }
  },
  methods: {
    connect () {
      this.getMessages()
      this.socket = io('localhost:3000')
      this.socket.on(this.user, (data) => {
        this.messages.push(data)
      })
    },
    getMessages () {
      axios.post('http://localhost:3000/messages', {user1: this.user, user2: this.other_user})
        .then(response => {
          for (let message of response.data) {
            this.messages.push(message)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    sendMessage () {
      if (this.message.length > 0) {
        this.socket.emit(
          'SEND_MESSAGE', {
            from: this.user,
            to: this.other_user,
            message: this.message
          }
        )
        this.messages.push({ from: this.user, message: this.message })
        this.message = ''
      }
    }
  }
}
</script>

<style scoped>
  #root {
    background-color: #eeeeee;
    margin: auto;
    width: 90%;
  }
  #chat {
    margin: 0px 5px;
    border: solid black 1px;
    padding: 0 50px;
    height: 40rem;
    overflow: auto;
  }
  #controls {
    display: grid;
    grid-template-columns: 10% 70% 20%;
  }
</style>
