<template>
    <div class="common-layout">
        <el-container class="bg-light-50" :style="`height: ${calculateHeight}px`">
            <el-header class="iamge-header">
                <div>
                    <el-button type="primary" size="small" @click="addImageClass">新增图片分类</el-button>
                    <el-button type="warning" size="small">上传图片</el-button>
                </div>
            </el-header>
            <el-container>
                <ImageAside />
                <ImageMain/>
            </el-container>
        </el-container>
    </div>
    <!-- 抽屉组件 -->
   <z-drawer ref="drawer" @cancel="cancel" @onSubmit="onSubmit"></z-drawer>
</template>

<script setup>
    import ZDrawer from '@/components/ZDrawer.vue'
    import ImageAside from '@/components/ImageAside.vue'
    import ImageMain from '@/components/ImageMain.vue'
    import {ref} from 'vue'
    //获取页面的总高度如果获取不到就获取body的高度
    let windowHeight = window.innerHeight || document.body.innerHeight
    //计算高度
    let calculateHeight = windowHeight - 64 - 40 - 40
    //获取抽屉实例
    const drawer = ref(null)
    const addImageClass = ()=>{
        drawer.value.open()
    }

    const cancel = ()=>{
        drawer.value.close()
    }

    const onSubmit = ()=>{
        console.log('提交');
    }
</script>

<style lang="scss" scoped>
    .iamge-header {
        @apply flex items-center rounded;
        border-bottom: 1px solid #eee;
    }

   

  
</style>