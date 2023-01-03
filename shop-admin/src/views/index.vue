<template>
    <div class="common-layout h-full">
        <el-container class="h-full">
            <el-header class="header">
                <my-header></my-header>
            </el-header>
            <el-container>
                <el-aside width="200px" class="h-full">Aside</el-aside>
                <el-main class="bg-gray-100 h-full">Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
    import MyHeader from '@/components/MyHeader/index.vue'
</script>

<style scoped>
    .header {
        @apply bg-indigo-700 text-light-50 h-[64px];
    }

    .aside {
        @apply h-full;
    }
</style>