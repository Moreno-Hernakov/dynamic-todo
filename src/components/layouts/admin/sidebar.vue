<template>
    <!-- <div id="sidebar-admin"> -->
        <aside  style="z-index: 0" class="sidebar-admin sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
            <div class="sidenav-header">
                <a class="navbar-brand m-0" target="_blank">
                <span class="ms-1 font-weight-bold">Todo Web App Admin</span>
                </a>
            </div>
            <hr class="horizontal dark mt-0"> 
            <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="javascript:;">
                    <router-link :class="`${this.$route.name == 'todo' ? 'active' : ''} nav-link `" to="/todo">
                        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Todo</span>
                    </router-link>
                    </a>
                    <!-- <a class="nav-link active">
                    </a> -->
                </li>
                <li class="nav-item">
                    <a href="javascript:;">
                    <router-link :class="`${this.$route.name == 'user' ? 'active' : ''} nav-link`" to="/user">
                        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">User</span>
                    </router-link>
                    </a>
                </li>
                
                </ul>
            </div>
        </aside>
    <!-- </div> -->
</template>

<style scoped src="../../../assets/css/argon-dashboard.css"></style>

<script>

    export default {
        name: 'sidebar-admin',
    }

</script>
