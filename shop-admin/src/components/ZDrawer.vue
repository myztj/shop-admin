<template>
    <el-drawer class="drawer" :close-on-click-modal="false" v-model="isDrawerShow" :destroy-on-close="destroyOnClose" :title="title" direction="rtl"
        :size="size">
        <div class="demo-drawer__content">
            <div class="demo-drawer__body">
                <slot></slot>
            </div>
            <div class="demo-drawer__footer">
                <el-button type="primary" :loading="loading" @click="onSubmit">{{
                    conifrmText
                    }}</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
    import { ref } from 'vue'
    const props = defineProps({
        //标题
        title:String,
        //宽度
        size:{
            type:String,
            default:'45%'
        },
        //按钮的文本
        conifrmText:{
            type:String,
            default:'提交'
        },
        //按钮加载的状态
        loading:{
            type:Boolean,
            default:false
        },
        //关闭drawer时是否销毁子元素
        destroyOnClose:{
            type:Boolean,
            default:false
        }
    })
     //抽屉是否打开
    const isDrawerShow = ref(false)
    //打开
    const open = () => isDrawerShow.value = true
     //关闭
    const close = () => isDrawerShow.value = false
    //把事件暴露给父组件
    const emit = defineEmits(['onSubmit','cancel'])
    //提交事件
    const onSubmit = ()=> emit('onSubmit')
    //取消事件
    const cancel = ()=>emit('cancel')
    defineExpose({
        open,
        close
    })
</script>

<style scoped>
    .demo-drawer__content {
        /* position: relative; */
        @apply flex flex-col justify-between;
        width: 100%;
        height: 100%;
    }
    .demo-drawer__body {
        @apply text-black;
        overflow: auto;

    }
</style>