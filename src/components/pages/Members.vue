<template>
  <div class="container">
    <h2 class="mb-5">使用者帳號管理</h2>
    <table class="table table-striped table-hover bg-primary">
      <thead>
        <tr>
          <th width="60">#</th>
          <th>暱稱</th>
          <th>帳號名稱</th>
          <th>註冊時間</th>
          <th width="50">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, key) in userArray" :key="key">
          <td>{{key}}</td>
          <td>{{user.name}}</td>
          <td>{{user.userName}}</td>
          <td>{{user.createtime}}</td>
          <td>
            <a href="#" class="btn btn-info" @click.prevent="editUser(user['.key'])">
              <span class="icon-edit-alt"></span>
            </a>
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
    editUser (id) {
      this.$router.push(`/admin/user/${id}`)
    }
  },
  beforeCreate () {
    // console.log(this.$current)
  }
}
</script>
