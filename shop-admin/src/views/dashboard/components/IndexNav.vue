<template>
    <el-row :gutter="20" class="mt-5">
        <el-col :span="3" :offset="0" v-for="(item,index) in navLiat" :key="index" @click="$router.push(item.path)">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div class="flex flex-col items-center cursor-pointer justify-self-center">
                    <el-icon :color="item.color" size="16">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span class="mt-2 text-sm">{{item.title}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>

</template>

<script setup>
    import navLiat from '@/mock/navList'
</script>

<style scoped>
:deep(.el-card){
    border: none;
}
</style>