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
            <a href="#" class="btn btn-info" @click.prevent="removeUser(user['.key'])">刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// import firebase from 'firebase'
export default {
  name: 'Members',
  data () {
    return {
      users: []
    }
  },
  firebase () {
    return {
      userArray: this.$db.ref('member/users')
    }
  },
  methods: {
    removeUser () {
      // let currentUser = firebase.auth().currentUser
      // console.log(currentUser)
    },
    editUser (id) {
      this.$router.push(`/admin/user/${id}`)
    }
  },
  beforeCreate () {
    console.log(this.$current)
  }
}
</script>
