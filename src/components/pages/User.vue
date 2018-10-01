<template>
  <div>
    <h3>User {{ thisUser.userName }}</h3>
    <form class="form">
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">UID</label>
        <input type="text" name="uid" disabled :value="thisUser.uid" class="col-12 col-sm form-control">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">帳號名稱</label>
        <input type="text" name="userName" disabled :value="thisUser.userName" class="col-12 col-sm form-control">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">密碼</label>
        <input type="password" name="password" class="col-12 col-sm form-control" v-model="thisUser.password">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">註冊時間</label>
        <input type="text" name="createtime" disabled :value="thisUser.createtime" class="col-12 col-sm form-control">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">帳號權限</label>
        <select name="" class="col-12 col-sm form-control" v-model.number="thisUser.competence">
          <option v-for="(item, key) in competences" :key="key">{{item.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn" @click.prevent="updateUserData($route.params.id)">變更</button>
      </div>
    </form>
  </div>
</template>

<script>
// import firebase from 'firebase'
// import $ from 'jquery'
export default {
  name: 'User',
  data () {
    return {
      useridRef: this.$db.ref(`member/users/${this.$route.params.id}`),
      thisUser: {
        uid: '',
        userName: '',
        password: '',
        createtime: '',
        competence: ''
      },
      competences: [
        {
          id: 0,
          name: '管理員'
        },
        {
          id: 1,
          name: '研發部'
        }
      ]
    }
  },
  methods: {
    getUser () {
      const vm = this
      vm.useridRef.on('value', snapshot => {
        console.log(snapshot.val())
        let data = snapshot.val()
        vm.thisUser.uid = data.uid
        vm.thisUser.userName = data.userName
        vm.thisUser.password = data.password
        vm.thisUser.createtime = data.createtime
        vm.thisUser.competence = data.competence
      })
    },
    updateUserData (id) {
      const vm = this
      vm.$db.ref(`member/users/${id}`).set(vm.thisUser)
      console.log('變更完成')
    }
  },
  mounted () {
    const vm = this
    vm.getUser()
  }
}
</script>
