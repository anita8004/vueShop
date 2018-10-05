<template>
  <div class="container">
    <h2 class="mb-5">操作紀錄</h2>
    <div class="table-responsive">
      <table class="table table-striped table-hover bg-primary">
        <thead>
          <th width="60">#</th>
          <th>帳號名稱</th>
          <th>動作</th>
          <th>操作時間</th>
        </thead>
        <tbody>
          <tr v-for="(item, key) in recordsArray" :key="key">
            <td>{{key}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.actions}}</td>
            <td>{{item.time}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Records',
  firebase () {
    return {
      recordsArray: this.$db.ref('records')
    }
  }
}
</script>
