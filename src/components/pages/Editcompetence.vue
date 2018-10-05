<template>
  <div>
    <h2 class="mb-5">編輯權限</h2>
    <form class="form">
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限名稱</label>
        <input type="text" name="name" class="col-12 col-sm form-control" v-model="competenceName">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限內容</label>
        <div class="col-12 col-sm">
          <div class="form-group">
            <label class="form-check-label" for="applist">
              <input type="checkbox" value="App清單" id="applist" class="form-check-inline" checked disabled v-model="readPage.applist"> App清單
            </label>
          </div>
          <div class="form-group">
            <label class="form-check-label" for="users">
              <input type="checkbox" value="使用者管理" id="users" class="form-check-inline" v-model="readPage.member"> 使用者管理
            </label>
          </div>
          <div class="form-group">
            <label class="form-check-label" for="competence">
              <input type="checkbox" value="權限管理" id="competence" class="form-check-inline" v-model="readPage.competence"> 權限管理
            </label>
          </div>
          <div class="form-group">
            <label class="form-check-label" for="records">
              <input type="checkbox" value="操作紀錄" id="records" class="form-check-inline" v-model="readPage.records"> 操作紀錄
            </label>
          </div>
        </div>
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限編號</label>
        <input type="number" name="competenceIndex" class="col-12 col-sm form-control" v-model="competenceIndex" disabled>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info" @click.prevent="updateData">變更</button>
      </div>
    </form>
    <div class="alert alert-success" role="alert" style="display: none">
      {{message}}
    </div>
  </div>
</template>
<script>
// import firebase from 'firebase'
// import $ from 'jquery'
export default {
  name: 'Editcompetence',
  data () {
    return {
      competenceName: '',
      readPage: {
        applist: true,
        member: false,
        competence: false,
        records: false
      },
      competenceIndex: '',
      competenceGroup: {},
      records: {
        userName: '',
        actions: '編輯權限群組',
        time: ''
      },
      message: ''
    }
  },
  // firebase: {
  //   userArr: this.$db.ref('member/users')
  // },
  beforeCreate () {
    this.message = ''
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
    groupData () {
      const vm = this
      vm.competenceGroup = {
        competenceName: vm.competenceName,
        readPage: vm.readPage
      }
    },
    getData () {
      const vm = this
      vm.$db.ref(`competenceGroups/${this.$route.params.id}`).on('value', snapshot => {
        let data = snapshot.val()
        vm.competenceIndex = data.competenceIndex
        vm.readPage = data.readPage
        vm.competenceName = data.competenceName
        vm.groupData()
      })
    },
    updateData () {
      const vm = this
      vm.$db.ref(`competenceGroups/${this.$route.params.id}`).update(vm.competenceGroup)
      vm.$db.ref('member/users').orderByChild('competenceIndex').equalTo(Number(vm.competenceIndex)).once('value', snapshot => {
        let data = snapshot.val()
        console.log(data)
        for (let key in data) {
          vm.$db.ref(`member/users/${key}`).update(vm.competenceGroup)
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
    getIndex () {
      let index = this.competenceArr.length
      this.competenceIndex = index
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
