<template>
    <div class="box" :class="{'active':active}" @click.stop="handerOnclick">
        <span class="text-gray-600 text-sm">
            <slot></slot>
        </span>
        <el-button text type="primary" class="ml-auto btn" @click.stop="handerEdit">
            <el-icon size="16">
                <Edit />
            </el-icon>
        </el-button>
        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon-color="#626AEF"
            title="是否要删除?" @confirm="confirmEvent">
            <template #reference>
                <el-button text type="primary" class="btn">
                    <el-icon size="16">
                        <Close />
                    </el-icon>
                </el-button>
            </template>
        </el-popconfirm>
    </div>
</template>

<script setup>
    const props = defineProps({
        active: Boolean,
    })
    //向父组件暴露事件
    const emit = defineEmits(['handerOnclick', 'handerEdit','confirmEvent'])
    const handerOnclick = () => {
        emit('handerOnclick')
    }

    const handerEdit = () => {
        emit('handerEdit')
    }

    const confirmEvent = ()=>{
        emit('confirmEvent')
    }

</script>

<style lang="scss" scoped>
    .box {
        @apply flex items-center p-2;

        &:hover {
            @apply bg-blue-50;
        }
    }

    .btn {
        @apply px-2;
    }

    .active {
        @apply bg-blue-50;
    }
</style>