<template>
  <div class="member">
    <form class="login-card" @submit.prevent="signup">
      <h1>Signup</h1>
      <div class="form-group">
        <label for="inputNickName">暱稱</label>
        <input type="text" class="form-control" id="inputNickName" placeholder="暱稱" v-model="user.name">
      </div>
      <div class="form-group">
        <label for="inputUserName">帳號</label>
        <input type="text" class="form-control" id="inputUserName" placeholder="使用者名稱" v-model="user.userName">
      </div>
      <div class="form-group">
        <label for="inputPassword">密碼</label>
        <input type="text" class="form-control" id="inputPassword" placeholder="使用者密碼" v-model="user.password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info btn-block">註冊</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
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
        competence: 1
      },
      records: {
        userName: '',
        actions: '註冊',
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
    addUser () {
      const vm = this
      let userRef = vm.$db.ref('member/users')
      userRef.push(vm.user)
    },
    signup () {
      const vm = this
      firebase.auth().createUserWithEmailAndPassword(vm.user.userName, vm.user.password).then(function (user) {
        user.updateProfile({
          displayName: vm.user.name
        }).then(function () {
          vm.user.uid = user.user.uid
          vm.user.createtime = vm.getTime()
          vm.addUser()
          vm.addRecord()
          console.log('創建帳號成功')
          vm.$router.push('/admin/applist')
        })
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
  }
}
</script>
