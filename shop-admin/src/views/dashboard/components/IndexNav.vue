<template>
   <el-row :gutter="20" class="mt-5">
    <el-col :span="3" :offset="0" v-for="(item,index) in 8" :key="index" @click="$router.push('/user/list')">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
            <div class="flex flex-col items-center cursor-pointer justify-self-center">
                <el-icon color="red" size="16">
                    <Plus />
                </el-icon>
                <span class="mt-2 text-sm">测试</span>
            </div>
        </el-card>
    </el-col>
   </el-row>
   
</template>

<script setup>
const props = defineProps({
    navList:{
        type:Array,
        // required:true
    }
})
</script>

<style scoped>

</style>