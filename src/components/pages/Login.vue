<template>
  <div class="member">
    <form class="login-card" @submit.prevent="signin">
      <h1>SignIn</h1>
      <div class="form-group">
        <label for="inputUserName">帳號</label>
        <input type="text" class="form-control" id="inputUserName" placeholder="使用者名稱" v-model="user.userName">
      </div>
      <div class="form-group">
        <label for="inputPassword">密碼</label>
        <input type="text" class="form-control" id="inputPassword" placeholder="使用者密碼" v-model="user.password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-block">登入</button>
        <span>or</span>
        <button type="button" class="signout btn btn-block"><router-link to="/signup">註冊</router-link></button>
        <button type="button" class="dashboard btn btn-block"><router-link to="/admin">Dashboard</router-link></button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import $ from 'jquery'
// var data = {
//   sid: 0,
//   username: 'anita8004@gmail.com',
//   password: '1234',
//   nickname: 'anita',
//   logintime: new Date(),
//   logouttime: ''
// }
export default {
  name: 'Login',
  data () {
    return {
      user: {
        userName: '',
        password: ''
      },
      users: []
    }
  },
  methods: {
    getTime () {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const format = (hours >= 12) ? '下午' : '上午'
      return `${format} ${hours}:${minutes}`
    },
    signin () {
      // this.$router.replace('admin')
      const vm = this
      firebase.auth().signInWithEmailAndPassword(vm.user.userName, vm.user.password).then(function (user) {
        console.log('登入成功!')
        console.log(user)
        $('.dashboard').css('display', 'block')
      }, function (err) {
        console.log(err.message)
      })
    }
  },
  mounted () {
    $('.dashboard').css('display', 'none')
  }
}
</script>
