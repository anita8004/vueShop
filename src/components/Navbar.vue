<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal">
        科智企業
      </h5>
      <a class="p-2 text-dark">Hi ~  {{currentUser.userName}}</a>
      <!-- <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">Features</a>
        <a class="p-2 text-dark" href="#">Enterprise</a>
        <a class="p-2 text-dark" href="#">Support</a>
        <a class="p-2 text-dark" href="#">Pricing</a>
      </nav> -->
      <a class="btn btn-outline-primary" href="#" @click.prevent="signout">Sign out</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Home',
  data () {
    return {
      currentUser: {
        uid: '',
        userName: '',
        state: ''
      },
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
        this.$router.replace('login')
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
        vm.currentUser.uid = user.uid
        vm.currentUser.userName = user.email
        vm.currentUser.state = 'login'
        vm.records.userName = vm.currentUser.userName
        vm.records.time = vm.getTime()
      } else {
        // No user is signed in.
        vm.currentUser.state = 'logout'
      }
    })
  }
}
</script>
