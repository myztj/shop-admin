<template>
    <el-card shadow="never" :body-style="{ padding: '20px' }" class="mb-2">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">
                    {{title}}
                </span>
                <el-tag type="danger" effect="plain">
                    <span>{{tagTitle}}</span>
                </el-tag>
            </div>
        </template>
        <el-row :gutter="20">
           <template v-if="cardData.length==0">
            <el-col :span="6" :offset="0" v-for="(item,index) in 4" :key="index">
                <el-card shadow="always" class="skeleton__card">
                    <el-skeleton>
                        <template #template>
                            <div class="flex flex-col items-center py-3">
                                <span class="h-3 w-[30px] bg-gray-100 rounded"></span>
                                <span class="mt-3 h-2 w-[60px] bg-gray-100 rounded"></span>
                            </div>
                        </template>
                    </el-skeleton>
                    
                </el-card>
            </el-col>
           </template>
            <template v-else>
                <el-col :span="6" :offset="0" v-for="(item,index) in cardData" :key="index">
                    <el-card shadow="hover">
                        <div class="flex flex-col items-center">
                            <span class="text-xl">{{item.value}}</span>
                            <span class="mt-2 text-sm text-gray-500">{{item.label}}</span>
                        </div>
                    </el-card>
                </el-col>
            </template>
        </el-row>
    </el-card>
</template>

<script setup>
    const props = defineProps({
        cardData: {
            type: Array,
            default: []
        },
        title: String,
        tagTitle: String
    })
</script>

<style scoped>
    :deep(.el-card) {
        border: none;
        background-color: #f6f6f6 !important;
    }
    .skeleton__card{
        background-color: #fff !important;
    }
</style>