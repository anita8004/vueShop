<template>
  <div class="container" id="page-users">
    <h1>使用者列表</h1>
    <table class="table">
      <tr>
        <th><input type="checkbox"></th>
        <th>Email</th>
        <th>名稱</th>
        <th>權限</th>
        <th>部門</th>
        <th>狀態</th>
        <th>編輯</th>
      </tr>
      <tr >
        <td><input type="checkbox"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      users: [
        user: {
          checked: false,
          name: '',
          userName: '',
          permission: '',
          department: '',
          status: ''
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
