<template>
    <div class="common-layout h-full">
        <el-container class="h-full">
            <el-header class="header">
                <my-header></my-header>
            </el-header>
            <el-container>
                <el-aside :width="isOpenMone?'64px':'250px'" class="aside">
                    <my-aside></my-aside>
                </el-aside>
                <el-main :class="{isunfold:isOpenMone}">
                    <my-tags class="tags"></my-tags>
                    <router-view v-slot="{ Component }">
                            <keep-alive :max="10">
                                <component :is="Component"></component>
                            </keep-alive>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>

    import MyAside from './components/MyAside/index.vue'
    import MyHeader from './components/MyHeader/index.vue'
    import MyTags from './components/MyTags/index.vue'
    import { ref } from 'vue'
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const store = useStore()
    const isOpenMone = computed(() => store.getters.isOpenMone)
</script>

<style scoped>
    .header {
        @apply bg-indigo-700 text-light-50 h-[64px];
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    .aside {
        @apply h-full;
        position: fixed;
        top: 64px;
        bottom: 0;
        z-index: 100;
    }

    .el-main {
        --el-main-padding: none;
        @apply bg-gray-100;
        position: absolute;
        top: 104px;
        left: 250px;
        right: 0;
        bottom: 0;
    }

    .isunfold{
        left: 64px !important;
    }
    .tags{
        position: fixed;
        top: 64px;
        left: 250px;
        right: 0;
        z-index: 100;
        background-color: #f3f4f6;
    }
</style>