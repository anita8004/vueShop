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
            <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello~ {{userName}}</a>
            <div class="dropdown-menu" aria-labelledby="dropdown04">
              <!-- <router-link to="/admin/profile" class="dropdown-item">修改個人資料</router-link> -->
              <a class="dropdown-item" href="#" @click.prevent="toProfile(currentUserKey)">修改個人資料</a>
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
      records: {
        userName: '',
        actions: '登出',
        time: ''
      },
      userName: '',
      currentUserKey: '',
      userCompetence: 1,
      userCanRead: false
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
      const vm = this
      vm.records.userName = vm.userName
      vm.records.time = vm.getTime()
      vm.$db.ref(`member/currentUser/${vm.currentUserKey}`).set(null)
      vm.$db.ref(`member/currentUser/${vm.currentUserKey}`).remove()
      vm.logoutRecord()
      firebase.auth().signOut().then(() => {
        vm.$router.replace('/login')
        console.log('登出成功')
      })
    },
    logoutRecord () {
      const vm = this
      vm.$db.ref('records').push(vm.records)
    },
    toProfile (id) {
      const vm = this
      vm.$router.push(`/admin/profile/${vm.currentUserKey}`)
    },
    getUserName (user) {
      const vm = this
      vm.userName = user.displayName || user.email || 'customer'
    }
  },
  mounted () {
    const vm = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        vm.getUserName(user)
        vm.$db.ref('member/currentUser').orderByChild('uid').equalTo(user.uid).on('value', snapshot => {
          let data = snapshot.val()
          if (data) {
            let key = Object.keys(data)[0]
            vm.currentUserKey = key
            vm.userName = data[key].name || user.displayName || user.email || '新註冊使用者'
          }
        })
      }
    })
  }
}
</script>
