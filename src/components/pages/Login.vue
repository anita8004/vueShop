<template>
  <div class="member">
    <form class="login-card" @submit.prevent="signin">
      <h1>SignIn</h1>
      <div class="form-group">
        <label for="inputUserName">帳號</label>
        <input type="email" class="form-control" id="inputUserName" placeholder="使用者名稱" v-model="user.userName" required>
      </div>
      <div class="form-group">
        <label for="inputPassword">密碼</label>
        <input type="password" class="form-control" id="inputPassword" placeholder="使用者密碼" v-model="user.password" required>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info btn-block">登入</button>
        <span>or</span>
        <button type="button" class="signout btn btn-info btn-block"><router-link to="/signup">註冊</router-link></button>
        <!-- <button type="button" class="dashboard btn btn-block"><router-link to="/admin">Dashboard</router-link></button> -->
      </div>
    </form>
  </div>
</template>
<script>
import firebase from 'firebase'
// import $ from 'jquery'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        uid: '',
        userName: '',
        password: '',
        name: '',
        createtime: '',
        competence: 2
      },
      records: {
        userName: '',
        actions: '登入',
        time: ''
      }
    }
  },
  methods: {
    getTime () {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDay()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const format = (hours >= 12) ? '下午' : '上午'
      return `${year}年${month}月${day}日 ${format} ${hours}:${minutes}:${seconds}`
    },
    signin () {
      const vm = this
      firebase.auth().signInWithEmailAndPassword(vm.user.userName, vm.user.password).then(function (user) {
        console.log('登入成功!')
        console.log(user)
        vm.addRecord()
        vm.$router.push('/admin/applist')
      }, function (err) {
        console.log(err.message)
      })
    },
    addRecord () {
      const vm = this
      let userRef = vm.$db.ref('records')
      vm.records.userName = vm.user.userName
      vm.records.time = vm.getTime()
      userRef.push(vm.records)
    }
  },
  mounted () {
    // $('.dashboard').css('display', 'none')
  }
}
</script>
