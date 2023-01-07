<template>
    <div class="common-layout h-full">
        <el-container class="h-full">
            <el-header class="header">
                <my-header></my-header>
            </el-header>
            <el-container>
                <el-aside :width="isOpenMone?'64px':'250px'" class="duration-700">
                    <my-aside></my-aside>
                </el-aside>
                <el-main class="bg-gray-100 h-full text">
                    <my-tags></my-tags>
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
    }

    .aside {
        @apply h-full;
    }

    .el-main {
        --el-main-padding: none;
    }

</style>