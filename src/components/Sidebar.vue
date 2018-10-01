<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin/applist" class="nav-link active">
            <span data-feather="home"></span>
            <img :src="logoimg" alt="" width="120">
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/members" class="nav-link">
            <span data-feather="users"></span>
            帳號管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/records" class="nav-link">
            <span data-feather="users"></span>
            操作紀錄
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/competence" class="nav-link">
            <span data-feather="users"></span>
            權限管理
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      logoimg: require('../assets/images/Servcloud-horizontal.png')
    }
  }
}
</script>
