<template>
  <div>
    <h3>Members</h3>
  </div>
</template>

<script>
import firebase from 'firebase'
// import $ from 'jquery'

export default {
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    var data = {
      sid: 0,
      username: 'anita8004@gmail.com',
      password: '1234',
      nickname: 'anita',
      logintime: new Date(),
      logouttime: ''
    }
    firebase.database().ref('users').set(data).catch(function (error) {
      console.log(error)
    })
  }
}
</script>
