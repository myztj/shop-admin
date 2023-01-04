<template>
    <el-menu default-active="/" class="el-menu-vertical-demo" router unique-opened :collapse="isCollapse">
        <aside-item v-for="(item,index) in menuList" :key="index" :item="item"></aside-item>
    </el-menu>
</template>

<script setup>
    import AsideItem from '@/components/MyAside/components/AsideItem.vue'
    import { computed } from "vue"
    import store from '@/store'
    //获取vuex的用户信息
    const menuList = computed(() => store.state.userInfo.menus)
    const isCollapse = computed(() => store.getters.isOpenMone)
</script>

<style scoped>
    .el-menu {
        border-right: none !important;
    }
</style>