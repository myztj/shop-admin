<template>
    <div class="box" :class="{'active':active}" @click="handerOnclick">
        <span class="text-gray-600 text-sm">
            <slot></slot>
        </span>
        <el-button text type="primary" class="ml-auto btn" @click="handerEdit">
            <el-icon size="16">
                <Edit />
            </el-icon>
        </el-button>
        <el-button text type="primary" class="btn" @click="handerDelete">
            <el-icon size="16">
                <Close />
            </el-icon>
        </el-button>
    </div>
</template>

<script setup>
    const props = defineProps({
        active: Boolean,
    })
    //向父组件暴露事件
    const emit = defineEmits(['handerOnclick','handerEdit','handerDelete'])
    const handerOnclick = ()=>{
        emit('handerOnclick')
    }
    
    const handerEdit = ()=>{
        emit('handerEdit')
    }

    const handerDelete = ()=>{
        emit('handerDelete')
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