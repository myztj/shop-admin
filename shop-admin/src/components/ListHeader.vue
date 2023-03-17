<template>
    <div class="flex items-center justify-between">
        <div>
            <el-button v-if="newAdd" type="primary" size="small" @click="$emit('added')">新增</el-button>
            <el-popconfirm title="是否要删除该记录？" confirm-button-text="是" cancel-button-text="否"
                @confirm="$emit('delete_all')" width="172px">
                <template #reference>
                    <el-button v-if="delete_all" type="danger" size="small">批量删除</el-button>
                </template> 
            </el-popconfirm>
                    <!-- 头部按钮追加 -->
                   <slot></slot>
        </div>
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
    const props = defineProps({
        delete_all: {
            type: Boolean,
            default: false
        },
        newAdd:{
            type:true,
            default:true
        }
    })
    defineEmits(['added', 'refreshList', 'delete_all'])
</script>

<style scoped>

</style>