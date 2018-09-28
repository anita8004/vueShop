<template>
  <div class="member">
    <form class="login-card" @submit.prevent="signup">
      <h1>Signup</h1>
      <div class="form-group">
        <label for="inputUserName">帳號</label>
        <input type="text" class="form-control" id="inputUserName" placeholder="使用者名稱" v-model="user.userName">
      </div>
      <div class="form-group">
        <label for="inputPassword">密碼</label>
        <input type="text" class="form-control" id="inputPassword" placeholder="使用者密碼" v-model="user.password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-block">註冊</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
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
    signup () {
      const vm = this
      firebase.auth().createUserWithEmailAndPassword(vm.user.userName, vm.user.password).then(function (user) {
        console.log('創建帳號成功')
      }, function (err) {
        console.log(err.message)
      })
    }
  }
}
</script>
