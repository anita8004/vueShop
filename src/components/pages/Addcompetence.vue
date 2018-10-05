<template>
  <div class="container">
    <h2 class="mb-5">新增權限</h2>
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
        <input type="number" name="competenceIndex" class="col-12 col-sm form-control" v-model.number="competenceIndex">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info" @click.prevent="addData">新增</button>
      </div>
    </form>
    <div class="alert alert-success" role="alert" style="display: none">
      {{message}}
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'Addcompetence',
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
        actions: '增加權限群組',
        time: ''
      },
      message: ''
    }
  },
  firebase () {
    return {
      competenceArr: this.$db.ref('competenceGroups')
    }
  },
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
        readPage: vm.readPage,
        competenceIndex: vm.competenceIndex
      }
    },
    addData () {
      const vm = this
      vm.groupData()
      vm.$db.ref('competenceGroups').push(vm.competenceGroup, error => {
        if (error) {
          console.log(error.message)
        } else {
          const promise1 = new Promise((resolve) => {
            resolve('新增完成')
            vm.addRecord()
            vm.message = '新增完成'
            $('.alert-success').css({
              display: 'block'
            })
          })
          promise1.then(value => {
            setTimeout(function () {
              vm.$router.push('/admin/competence')
            }, 500)
          })
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
    this.getIndex()
  }
}
</script>
