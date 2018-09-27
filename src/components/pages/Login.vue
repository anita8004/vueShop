<template>
  <div class="login">
    <form class="login-card" @submit.prevent="signin">
      <div class="form-group">
        <label for="inputUserName">帳號：</label>
        <input type="text" class="form-control" id="inputUserName" placeholder="使用者名稱" v-model="user.userName">
      </div>
      <div class="form-group">
        <label for="inputPassword">密碼：</label>
        <input type="text" class="form-control" id="inputPassword" placeholder="使用者密碼" v-model="user.password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-block">登入</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = `${process.env.APIPATH}/signin`
      const vm = this
      this.$http.post(api, vm.user).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          vm.$router.push('/admin/products')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .login {
    position: relative;
    width: 100%;
    height: 100vh;
    .login-card {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin: auto;
      transform: translateY(-50%);
      width: 600px;
      max-width: 90%;
      border-radius: 5px;
      padding: 16px;
    }
  }
</style>
