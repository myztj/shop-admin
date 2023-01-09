<template>
    <div class="flex items-center justify-between px-2 mt-1">
        <el-tabs v-model="activeTba" type="card" style="min-width: 100px;" class="demo-tabs" @tab-remove="removeTab"
            @tab-change="handlerTabChange">
            <el-tab-pane :closable="item.path!='/'" v-for="item in tbasList" :key="item.path" :label="item.title"
                :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <span class="rightDro">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link bg-light-50 h-[32px] px-3 rounded flex items-center justify-center">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeElse">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
</template>
<script setup>
    //组件相关的逻辑封装，抽离在useTabsList.js中（vue3 setup语法糖提供的一种写法），方便后期维护！！
    import { useTabsList } from'./useTabsList.js'
    //执行这个函数 把相关的数据个方法结构出来就可以了
    const {activeTba, tbasList, handlerTabChange, removeTab, handleCommand} = useTabsList()
</script>

<style scoped>
    .rightDro {
        @apply text-light-50 h-[32px] px-2;
        line-height: 32px;
    }

    :deep(.el-tabs__header) {
        margin: 0 !important;
    }

    :deep(.el-tabs__nav) {
        border: none !important;
    }

    :deep(.el-tabs__item) {
        border: none !important;
        @apply px-2 h-[32px] bg-light-50 mx-1 rounded;
        line-height: 32px;
    }

    :deep(.el-tabs__header) {
        border: none !important;
    }

    :deep(.el-tabs__nav-next),
    :deep(.el-tabs__nav-prev) {
        @apply h-[32px] text-gray-700;
        line-height: 32px;
        font-size: 16px;
        font-weight: bold !important;
    }

    :deep(.is-disabled) {
        @apply text-gray-300;
    }

    :deep(.el-icon--right) {
        margin: 0 !important;
    }
</style>