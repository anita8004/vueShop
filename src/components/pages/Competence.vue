<template>
  <div>
    <h2 class="mb-5">權限管理</h2>
    <div class="text-right m-2">
      <router-link to="/admin/addcompetence" class="btn btn-info">新增權限</router-link>
      <button type="button" class="btn btn-info">新增權限內容</button>
    </div>
    <table class="table table-striped table-hover bg-primary">
      <thead>
        <tr>
          <td>編號</td>
          <td>權限群組名稱</td>
          <td>權限內容</td>
          <td>編輯</td>
          <td>刪除</td>
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
            <a href="#" class="btn btn-info" @click.prevent="editCompetence(item['.key'])">編輯</a>
          </td>
          <td>
            <a href="#" class="btn btn-info" @click.prevent="removeCompetence(item['.key'])">刪除</a>
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
    return {}
  },
  firebase () {
    return {
      competenceArr: this.$db.ref('competenceGroups')
    }
  },
  methods: {
    editCompetence (id) {},
    removeCompetence (id) {}
  }
}
</script>
