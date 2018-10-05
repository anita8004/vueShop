<template>
  <div class="member text-center container">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" class="form-control" id="inputUserName" placeholder="使用者帳號" v-model="user.userName" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" class="form-control" id="inputPassword" placeholder="使用者密碼" v-model="user.password" required>
      </div>
      <div class="form-group">
        <button class="btn btn-lg btn-info btn-block mb-3" type="submit">登入</button>
        <router-link to="/signup" class="signup btn btn-lg btn-info btn-block">註冊</router-link>
      </div>
      <div class="form-group">
        <p>{{message}}</p>
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
        lastLogin: '',
        competenceName: '',
        readPage: {
          applist: true,
          member: false,
          competence: false,
          records: false
        },
        competenceIndex: '',
        state: ''
      },
      records: {
        userName: '',
        actions: '登入',
        time: ''
      },
      message: ''
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
        vm.$db.ref('member/users').orderByChild('uid').equalTo(user.user.uid).on('value', snapshot => {
          let data = snapshot.val()
          for (let key in data) {
            let value = data[key]
            vm.user = value
            vm.$db.ref('member/currentUser').push(vm.user)
            vm.addRecord()
            vm.$router.push('/admin/applist')
          }
        })
      }, function (err) {
        vm.message = err.message
        console.log(err.code)
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
  }
}
</script>
