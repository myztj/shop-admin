<template>
    <template v-if="statisticsList1.length<=0">
        <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
                <el-skeleton style="width: 100%" animated loading>
                    <template #template>
                        <el-card shadow="hover" :body-style="{ padding: '20px' }" class="border-0">
                            <template #header>
                                <div class="flex justify-between p-2">
                                    <el-skeleton-item variant="text" style="width: 30%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </template>
                            <el-skeleton-item variant="h1" style="width: 30%" />
                            <el-divider />
                            <div class="flex items-center justify-between text-sm flex text-gray-500">
                                <el-skeleton-item variant="text" style="width: 30%" />
                                <el-skeleton-item variant="text" style="width: 10%" />
                            </div>
                        </el-card>
                    </template>
                </el-skeleton>
            </el-col>
        </el-row>
    </template>
    <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="(item,index) in statisticsList1" :key="index">
            <el-card shadow="hover" :body-style="{ padding: '20px' }" class="border-0">
                <template #header>
                    <div class="flex justify-between p-2">
                        <span class="text-sm">
                            {{item.title}}
                        </span>
                        <el-tag :type="item.unitColor" effect="plain">
                            {{ item.unit }}
                        </el-tag>
                    </div>
                </template>
                <span class="text-3xl font-sans text-gray-500 font-bold">
                    <!-- {{item.value}} -->
                    <MyCartoonNum :value="item.value"></MyCartoonNum>
                </span>
                <el-divider />
                <div class="flex items-center justify-between text-sm flex text-gray-500">
                    <span>{{item.subTitle}}</span>
                    <span>{{item.subValue}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
    import MyCartoonNum from '@/components/MyCartoonNum/index.vue'
    const props = defineProps({
        statisticsList1: {
            type: Array,
            required: true
        }
    })

</script>

<style scoped>
:deep(.el-card){
    border: none;
}
</style>