<template>
  <div>
    <h2 class="mb-5">User {{ thisUser.userName }}</h2>
    <form class="form">
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">UID</label>
        <input type="text" name="uid" disabled v-model="thisUser.uid" class="col-12 col-sm form-control">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">暱稱</label>
        <input type="text" name="name" v-model="thisUser.name" class="col-12 col-sm form-control">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">帳號名稱</label>
        <input type="text" name="userName" disabled v-model="thisUser.userName" class="col-12 col-sm form-control">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">密碼</label>
        <input type="password" name="password" disabled class="col-12 col-sm form-control" v-model="thisUser.password">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">註冊時間</label>
        <input type="text" name="createtime" disabled v-model="thisUser.createtime" class="col-12 col-sm form-control">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">帳號權限</label>
        <select name="" class="col-12 col-sm form-control" v-model.number="thisUser.competence" @change="changeCompetence(thisUser.competenceIndex)">
          <option v-for="(item, key) in competenceArr" :key="key" :value="item.index">{{item.groupName}}</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info" @click.prevent="updateUserData($route.params.id)">變更</button>
        <button type="submit" class="btn btn-danger" @click.prevent="deleteUser($route.params.id)">刪除帳戶</button>
      </div>
    </form>
    <div class="alert alert-success" role="alert" style="display: none">
      {{message}}
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import $ from 'jquery'
export default {
  name: 'Profile',
  data () {
    return {
      message: '',
      useridRef: this.$db.ref(`member/users/${this.$route.params.id}`),
      thisUser: {
        uid: '',
        userName: '',
        password: '',
        name: '',
        createtime: '',
        lastLogin: '',
        competenceName: '',
        readPage: {
          applist: true,
          member: false,
          competence: false,
          records: false
        },
        competenceIndex: '',
        state: ''
      },
      records: {
        userName: '',
        actions: '個人資料編輯',
        time: ''
      }
    }
  },
  firebase () {
    return {
      competenceArr: this.$db.ref('competenceGroups')
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
    getUser () {
      const vm = this
      vm.useridRef.on('value', snapshot => {
        let data = snapshot.val()
        vm.thisUser = data
        console.log(vm.thisUser)
      })
    },
    changeCompetence (num) {
      console.log(num)
      const vm = this
      vm.$db.ref('competenceGroups').on('value', snapshot => {
        let data = snapshot.val()
        let dataArr = []
        for (let key in data) {
          let value = data[key]
          dataArr.push(value)
        }
        let finalData = dataArr[num]
        vm.thisUser.competenceName = finalData.competenceName
        vm.thisUser.readPage = finalData.readPage
        console.log(vm.thisUser)
      })
    },
    updateUserData (id) {
      const vm = this
      vm.$db.ref(`member/users/${id}`).update(vm.thisUser, error => {
        if (error) {
          vm.message = error.message
          $('.alert').removeClass('.alert-success').addClass('.alert-danger').css({display: 'block'})
          setTimeout(function () {
            $('.alert').css({display: 'none'})
          }, 1000)
        } else {
          console.log(vm.thisUser)
          vm.message = '資料已更新'
          $('.alert').removeClass('.alert-danger').addClass('.alert-success').css({display: 'block'})
          setTimeout(function () {
            $('.alert').css({display: 'none'})
          }, 1000)
          vm.addRecord()
        }
      })
    },
    addRecord () {
      const vm = this
      let userRef = vm.$db.ref('records')
      vm.records.userName = vm.$current.userName || ''
      vm.records.time = vm.getTime()
      userRef.push(vm.records)
    },
    deleteUser (id) {
      const vm = this
      let user = firebase.auth().currentUser
      vm.records.actions = '個人資料刪除'
      vm.addRecord()
      user.delete().then(function() {
        console.log('刪除成功')
        vm.$db.ref(`member/users/${id}`).remove()
        vm.$router.push('/login')
      }).catch(function(error) {
        // An error happened.
      });
    }
  },
  mounted () {
    const vm = this
    vm.getUser()
  }
}
</script>
