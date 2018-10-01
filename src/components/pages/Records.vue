<template>
  <div>
    <h2>RECORDS</h2>
    <table class="table">
      <thead>
        <th>#</th>
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
