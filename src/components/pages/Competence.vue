<template>
  <div class="container">
    <h2 class="mb-5">權限管理</h2>
    <div class="text-right mb-3">
      <router-link to="/admin/addcompetence" class="btn btn-info"><span class="icon-list-add"></span>新增權限</router-link>
    </div>
    <table class="table table-striped table-hover bg-primary">
      <thead>
        <tr>
          <th width="60">編號</th>
          <th>權限群組名稱</th>
          <th>權限內容</th>
          <th width="50">編輯</th>
          <th width="50">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in competenceArr" :key="key">
          <td>{{item.competenceIndex}}</td>
          <td>{{item.competenceName}}</td>
          <td>
            <span class="badge badge-info m-1" v-for="(span, key) in item.readPage" v-if="span" :key="key">
              {{key}}
            </span>
          </td>
          <td>
            <a href="#" class="btn btn-info" @click.prevent="editCompetence(item['.key'])">
              <span class="icon-edit-alt"></span>
            </a>
          </td>
          <td>
            <a href="#" class="btn btn-info" @click.prevent="removeCompetence(item['.key'])">
              <span class="icon-trash"></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Competence',
  data () {
    return {
      records: {
        userName: '',
        actions: '刪除權限群組',
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
    addRecord () {
      const vm = this
      let userRef = vm.$db.ref('records')
      vm.records.userName = vm.$current.userName || ''
      vm.records.time = vm.getTime()
      userRef.push(vm.records)
    },
    editCompetence (id) {
      this.$router.push(`/admin/editcompetence/${id}`)
    },
    removeCompetence (id) {
      const vm = this
      vm.addRecord()
      vm.$db.ref(`competenceGroups/${id}`).remove()
    }
  }
}
</script>
