<template>
  <div>
    <h3>Members</h3>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>帳號名稱</th>
          <th>註冊時間</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, key) in userArray" :key="key">
          <td>{{user.uid}}</td>
          <td>{{user.userName}}</td>
          <td>{{user.createtime}}</td>
          <td @click.prevent="editUser(user['.key'])">
            編輯
          </td>
          <td @click.prevent="removeUser">刪除</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import firebase from 'firebase'
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
      let currentUser = firebase.auth().currentUser
      console.log(currentUser)
    },
    editUser (id) {
      this.$router.push(`/admin/user/${id}`)
    }
  }
}
</script>
