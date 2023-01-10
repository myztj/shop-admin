<template>
    <el-drawer append-to-body 
    class="drawer" 
    :close-on-click-modal="closeOnClickModal" 
    v-model="isDrawerShow" 
    :destroy-on-close="destroyOnClose" 
    :title="title" direction="rtl"
    @close="handelClose"
        :size="size">
        <div class="demo-drawer__content">
            <div class="demo-drawer__body">
                <slot></slot>
            </div>
            <div class="demo-drawer__footer" v-if="btn">
                <el-button type="primary" :loading="loading" @click="onSubmit">{{
                    conifrmText
                    }}</el-button>
                <el-button @click.stop="cancel">取消</el-button>
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
        },
        //是否显示按钮
        btn:{
           type:Boolean,
           default:true
        },
        //点击其他地方是否可以关闭抽屉
        closeOnClickModal:{
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
    const emit = defineEmits(['onSubmit','cancel','handelClose'])
    //提交事件
    const onSubmit = ()=> emit('onSubmit')
    //取消事件
    const cancel = ()=>emit('cancel')
    //抽屉关闭的回调
    const handelClose = ()=> emit('handelClose')
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