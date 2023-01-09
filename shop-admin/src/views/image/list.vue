<template>
    <div class="common-layout">
        <el-container class="bg-light-50" :style="`height: ${calculateHeight}px`">
            <el-header class="iamge-header">
                <div>
                    <el-button type="primary" size="small" @click="addImageClass">新增图片分类</el-button>
                    <el-button type="warning" size="small" @click="uploadingImane">上传图片</el-button>
                </div>
            </el-header>
            <el-container>
                <!-- //侧边栏 -->
                <ImageAside ref="ImageAsideRef" @handerOnclick="handerOnclick"/>
                <!-- 主内容 -->
                <ImageMain ref="mainRef" />
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import ImageAside from '@/components/ImageAside.vue'
    import ImageMain from '@/components/ImageMain.vue'
    //获取页面的总高度如果获取不到就获取body的高度
    let windowHeight = window.innerHeight || document.body.innerHeight
    //计算高度
    let calculateHeight = windowHeight - 64 - 40 - 40

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

<style lang="scss" scoped>
    .iamge-header {
        @apply flex items-center rounded;
        border-bottom: 1px solid #eee;
    }
</style>