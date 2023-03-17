<template>
    <div class="flex items-center rounded flex-wrap items-center">
        <el-image class="h-[100px] w-[100px] pr-2" :src="modelValue" fit="cover" v-if="typeof modelValue=='string'"></el-image>
        <div class="flex flex-wrap" v-else>
            <div class="relative h-[100px] w-[100px]  mb-2 mx-1" v-for="src in modelValue" :key="src">
                <el-image :src="src" fit="cover" class="h-[100px] w-[100px] rounded border mr-2"></el-image>
                <div class="absolute right-[5px] top-[0px] cursor-pointer">
                    <el-icon @click="removeImage(src)" style="z-index: 10;" class="bg-light-50 rounded-1"><CircleClose /></el-icon>
                </div>
            </div>
        </div>
    <div class="btn" @click="open">
        <el-icon :size="30" color="#ccc">
            <Plus />
        </el-icon>
    </div>
    </div>
    <el-dialog v-model="dialogVisible" title="选者图片" width="80%" top="5vh">
        <div class="common-layout">
            <el-container class="bg-light-50" style="height: 70vh">
                <el-container>
                    <!-- //侧边栏 -->
                    <ImageAside ref="ImageAsideRef" @handerOnclick="handerOnclick" />
                    <!-- 主内容 -->
                    <ImageMain :limit="limit" @checkedImgae="checkedImgae" showChckbox ref="mainRef" />
                </el-container>
            </el-container>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onSubmit" type="primary">确定</el-button>
                <el-button @click="dialogVisible = false">
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import ImageAside from '@/components/ImageAside.vue'
    import ImageMain from '@/components/ImageMain.vue'
    import { ref } from 'vue'
    import {toast} from '@/common/promptComponent'
    const props = defineProps({
        modelValue: [String, Array],
        limit: {
            type:Number,
            default:1
        }
    })
    const dialogVisible = ref(false)
    const open = () => dialogVisible.value = true
    const ImageAsideRef = ref(null)
    const mainRef = ref(null)
    console.log(props.modelValue);
    const addImageClass = () => {
        ImageAsideRef.value.handerOpen()
    }
    //父组件调用aside组件传过来的方法并接受数据，再调用main组件暴露的方法，把Id传给main就实现了子组件之间的通讯了
    const handerOnclick = (id) => {
        mainRef.value.getImageClassId(id)
    }

    const uploadingImane = () => {
        mainRef.value.uploadingImageOpenDrawer()
    }
    //获取选中的图片Url
    let urls = []
    const checkedImgae = (e) => {
        //拿到的是计算属性过滤的数据，是个数组遍历拿到数据，赋值给一个变量
        urls = e.map(o => o.url)
        console.log(urls);
    }
    const emit = defineEmits(['update:modelValue'])
    const onSubmit = () => {
        let value = []
        if(props.limit>1){
            value = [...urls,...props.modelValue]
            if (value.length >props.limit ) {
                return toast('最多只可以上传'+(props.limit-props.modelValue.length)+'张')
            }
        }else{
            value = urls[0]
        }
        if (value) {
            console.log(123);
            emit('update:modelValue', value)
            dialogVisible.value=false 
        }
    }
    const removeImage = (src)=>{
        emit('update:modelValue',props.modelValue.filter(url=>url!=src))
    }
</script>

<style scoped>
    .btn {
        @apply flex items-center justify-center w-[100px] h-[100px] hover: bg-gray-100 rounded;
        border: 1px dashed #ccc;
    }
</style>