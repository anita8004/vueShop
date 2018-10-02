<template>
  <div id="header">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <router-link to="/admin/applist" class="navbar-brand">
        <img :src="logoimg" alt="科智企業" width="150">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="javascript:;">
              合約 2018-12-31
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="text-white nav-link dropdown-toggle" href="#" id="dropdown_Language" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Language</a>
            <div class="dropdown-menu" aria-labelledby="dropdown_Language">
              <a class="dropdown-item" href="#">繁體中文</a>
              <a class="dropdown-item" href="#">簡體中文</a>
              <a class="dropdown-item" href="#">English</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello~ {{currentUser.name}}</a>
            <div class="dropdown-menu" aria-labelledby="dropdown04">
              <a class="dropdown-item" href="#">修改個人資料</a>
              <a class="dropdown-item" href="#">修改密碼</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link signoutBtn" href="#" @click.prevent="signout">
              <span class="icon-logout"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Navbar',
  data () {
    return {
      logoimg: require('../assets/images/Servcloud-horizontal.png'),
      currentUser: null,
      records: {
        userName: '',
        actions: '登出',
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
    signout () {
      firebase.auth().signOut().then(() => {
        this.logoutRecord()
        this.$router.replace('/login')
      })
    },
    logoutRecord () {
      const vm = this
      vm.$db.ref('records').push(vm.records)
    }
  },
  mounted () {
    const vm = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user)
        vm.currentUser = {
          uid: user.uid,
          userName: user.email,
          name: user.displayName,
          state: 'login'
        }
        vm.$db.ref('member/currentUser').set(vm.currentUser)
        vm.records.userName = vm.$current.userName
        vm.records.time = vm.getTime()
      } else {
        // No user is signed in.
        vm.currentUser = null
        vm.$db.ref('member/currentUser').set(vm.currentUser)
      }
    })
  }
}
</script>
