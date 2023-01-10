<template>
    <div class="btn" @click="open">
        <el-icon :size="30" color="#ccc">
            <Plus />
        </el-icon>
    </div>
    <el-dialog v-model="dialogVisible" title="选者图片" width="80%" top="5vh">
        <div class="common-layout">
            <el-container class="bg-light-50" style="height: 70vh">
                <el-container>
                    <!-- //侧边栏 -->
                    <ImageAside ref="ImageAsideRef" @handerOnclick="handerOnclick"/>
                    <!-- 主内容 -->
                    <ImageMain showChckbox ref="mainRef" />
                </el-container> 
            </el-container>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">确定</el-button>
                <el-button type="primary" @click="dialogVisible = false">
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
    const dialogVisible = ref(false)
    const open = () => dialogVisible.value = true
    const ImageAsideRef = ref(null)
    const mainRef = ref(null)
    const addImageClass = () => {
        ImageAsideRef.value.handerOpen()
    }
    //父组件调用aside组件传过来的方法并接受数据，再调用main组件暴露的方法，把Id传给main就实现了子组件之间的通讯了
    const handerOnclick = (id)=>{
        mainRef.value.getImageClassId(id)
    }

    const uploadingImane = ()=>{
        mainRef.value.uploadingImageOpenDrawer()
    }
</script>

<style scoped>
    .btn {
        @apply flex items-center justify-center w-[100px] h-[100px] hover: bg-gray-100 rounded;
        border: 1px dashed #ccc;
    }
    
</style>