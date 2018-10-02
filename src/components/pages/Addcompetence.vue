<template>
  <div>
    <h2 class="mb-5">新增權限</h2>
    <form class="form">
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限名稱</label>
        <input type="text" name="name" class="col-12 col-sm form-control" v-model="competence.groupName">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限內容</label>
        <div class="col-12 col-sm">
          <div class="form-group">
            <label class="form-check-label" for="applist">
              <input type="checkbox" value="App清單" id="applist" class="form-check-inline" v-model="competence.groupValue"> App清單
            </label>
          </div>
          <div class="form-group">
            <label class="form-check-label" for="users">
              <input type="checkbox" value="使用者管理" id="users" class="form-check-inline" v-model="competence.groupValue"> 使用者管理
            </label>
          </div>
          <div class="form-group">
            <label class="form-check-label" for="competence">
              <input type="checkbox" value="權限管理" id="competence" class="form-check-inline" v-model="competence.groupValue"> 權限管理
            </label>
          </div>
        </div>
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限編號</label>
        <input type="number" name="index" class="col-12 col-sm form-control" v-model="competence.index">
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
      competence: {
        groupName: '',
        groupValue: [],
        index: 0
      },
      competenceGroup: [],
      records: {
        userName: '',
        actions: '增加權限群組',
        time: ''
      },
      message: ''
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
    addData () {
      const vm = this
      vm.competenceGroup.push(vm.competence)
      vm.$db.ref('competenceGroups').push(vm.competence)
      vm.addRecord()
      vm.message = '新增完成'
      $('.alert-success').css({
        display: 'block'
      })
    },
    addRecord () {
      const vm = this
      let userRef = vm.$db.ref('records')
      vm.records.userName = vm.$current.userName
      vm.records.time = vm.getTime()
      userRef.push(vm.records)
    }
  }
}
</script>
