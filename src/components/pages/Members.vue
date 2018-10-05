<template>
  <div>
    <h2 class="mb-5">使用者帳號管理</h2>
    <table class="table table-striped table-hover bg-primary">
      <thead>
        <tr>
          <th>#</th>
          <th>暱稱</th>
          <th>帳號名稱</th>
          <th>註冊時間</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, key) in userArray" :key="key">
          <td>{{key}}</td>
          <td>{{user.name}}</td>
          <td>{{user.userName}}</td>
          <td>{{user.createtime}}</td>
          <td>
            <a href="#" class="btn btn-info" @click.prevent="editUser(user['.key'])">編輯</a>
          </td>
          <td>
            <a href="#" class="btn btn-info" disabled @click.prevent="removeUser(user['.key'], user.uid)">刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Members',
  data () {
    return {
      users: [],
      records: {
        userName: '',
        actions: '刪除使用者',
        time: ''
      }
    }
  },
  firebase () {
    return {
      userArray: this.$db.ref('member/users')
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
    addRecord () {
      const vm = this
      let userRef = vm.$db.ref('records')
      vm.records.userName = vm.$current.userName
      vm.records.time = vm.getTime()
      userRef.push(vm.records)
    },
    removeUser (id, uid) {
      // const vm = this
      // console.log(id)
      // console.log(uid)
      // let user = vm.$auth.currentUser
      // console.log(user)
      // if (user.uid === uid) {
      //   user.delete().then(function () {
      //     console.log(user)
      //   })
      // }
      // vm.$auth.deleteUser(uid).then(function () {
      //   console.log('Successfully deleted user')
      //   vm.$db.ref(`member/users/${id}`).remove()
      //   vm.addRecord()
      // }).catch(function (error) {
      //   console.log('Error deleting user:', error)
      // })
    },
    editUser (id) {
      this.$router.push(`/admin/user/${id}`)
    }
  },
  beforeCreate () {
    // console.log(this.$current)
  }
}
</script>
