<template>
  <nav class="col-md-2 d-none d-md-block bg-dark sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin/applist" class="nav-link active">
            <span class="icon-th-thumb"></span>
            APP 平台
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/members" class="nav-link">
            <span class="icon-user"></span>
            帳號管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/competence" class="nav-link">
            <span class="icon-cog"></span>
            權限管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/records" class="nav-link">
            <span class="icon-record"></span>
            操作紀錄
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>
