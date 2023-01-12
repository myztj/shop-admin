<template>
    <div class="flex items-center justify-between">
        <el-button type="primary" size="small" @click="$emit('added')">新增</el-button>
        <el-tooltip class="box-item" effect="dark" content="刷新列表" placement="top">
            <el-button text @click="$emit('refreshList')">
                <el-icon size="15">
                    <Refresh />
                </el-icon>
            </el-button>
        </el-tooltip>
    </div>
</template>

<script setup>
defineEmits(['added','refreshList'])
</script>

<style scoped>

</style>