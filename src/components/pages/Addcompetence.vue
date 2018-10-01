<template>
  <div>
    <h2>新增權限</h2>
    <form class="form">
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限名稱</label>
        <input type="text" name="name" class="col-12 col-sm form-control" v-model="competence.groupName">
      </div>
      <div class="form-group form-row">
        <label class="col-12 col-sm-3 col-form-label">權限內容</label>
        <div class="col-12 col-sm">
          <div class="form-group">
            <label class="form-check-label">
              <input type="checkbox" name="applist" id="" class="form-check-inline"> App清單
            </label>
          </div>
          <div class="form-group">
            <label class="form-check-label">
              <input type="checkbox" name="users" id="" class="form-check-inline"> 使用者管理
            </label>
          </div>
          <div class="form-group">
            <label class="form-check-label">
              <input type="checkbox" name="competence" id="" class="form-check-inline"> 權限管理
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn" @click.prevent="addData">變更</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Addcompetence',
  data () {
    return {
      competence: {
        groupName: '',
        groupValue: {
          applist: false,
          users: false,
          competence: false
        }
      }
    }
  },
  methods: {
    addData () {}
  }
}
</script>
