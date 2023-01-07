<template>
    <el-menu :default-active="activePath" class="el-menu-vertical-demo" router unique-opened :collapse="isCollapse">
        <aside-item v-for="(item,index) in menuList" :key="index" :item="item"></aside-item>
    </el-menu>
</template>

<script setup>
    import AsideItem from './components/AsideItem.vue'
    import { computed } from "vue"
    import store from '@/store'
    import { useRoute } from "vue-router"
    const route = useRoute()
    console.log(route.fullPath);
    //获取vuex的用户信息
    const menuList = computed(() => store.state.userInfo.menus)
    //获取侧边菜单是否打开状态
    const isCollapse = computed(() => store.getters.isOpenMone)
    //获取当前路由信息
    const activePath = computed(() => route.fullPath)
</script>

<style scoped>
    .el-menu { 
        border-right: none !important;
        @apply shadow-md bg-light-50;
        height: calc(100vh - 64px);
    }
</style>