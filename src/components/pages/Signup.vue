<template>
  <div class="member text-center container">
    <form class="form-signin" @submit.prevent="signup">
      <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" class="form-control" id="inputUserName" placeholder="使用者帳號" v-model="user.userName" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" class="form-control" id="inputPassword" placeholder="使用者密碼" v-model="user.password" required>
      </div>
      <div class="form-group">
        <button class="btn btn-lg btn-info btn-block" type="submit">註冊</button>
      </div>
      <div class="form-group">
        <p>{{message}}</p>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { Base64 } from 'js-base64'
export default {
  name: 'Signup',
  data () {
    return {
      user: {
        uid: '',
        userName: '',
        password: '',
        name: '',
        createtime: '',
        lastLogin: '',
        competenceName: '新使用者',
        readPage: {
          applist: true,
          member: false,
          competence: false,
          records: false
        },
        competenceIndex: 4,
        state: ''
      },
      records: {
        userName: '',
        actions: '註冊',
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
    signup () {
      const vm = this
      firebase.auth().createUserWithEmailAndPassword(vm.user.userName, vm.user.password).then(function (user) {
        vm.user = {
          uid: user.user.uid,
          userName: user.user.email,
          password: Base64.encode(vm.user.password),
          name: user.user.displayName || '新註冊使用者',
          createtime: user.user.metadata.creationTime,
          lastLogin: user.user.metadata.lastSignInTime,
          competenceName: '新使用者',
          readPage: {
            applist: true,
            member: false,
            competence: false,
            records: false
          },
          competenceIndex: 4,
          state: user.operationType
        }
        vm.$db.ref('member/currentUser').push(vm.user)
        vm.$db.ref('member/users').push(vm.user)
        vm.addRecord()
        console.log('創建帳號成功')
        vm.$router.push('/admin/applist')
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
  }
}
</script>
