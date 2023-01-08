<template>
    <el-aside width="220px" class="image-aside">
        <div class="top">
            <!-- 图库列表的的抽离 -->
            <ImageList v-for="(item,index) in ImageClassList" :key="index" 
            :active="active==index" 
            @handerOnclick="handerOnclick(index)"
            @handerEdit="handerEdit"
            @handerDelete="handerDelete"
            >
                {{item.name}}
            </ImageList>
        </div>
        <div class="bottom">
            <el-pagination 
            background 
            layout="prev, next" 
            :total="total" 
            @current-change="getImageClass"
             />
        </div>
    </el-aside>
</template>

<script setup>
    import Image from '@/api/image_class'
    import { ref } from 'vue'
    import ImageList from '@/components/ImageList.vue'
    //页码
    const page = ref(1)
    //每页条数
    const limit = ref(10)
    //图片分类的数据
    const ImageClassList = ref([])
    //当前点击图片分类的下标
    const active = ref(0)
    //数组总条数
    const total = ref(0)
    //获取图库列表数据
    const getImageClass = async (p=null) => {
        //页码切换调取不同数据，利用页码组件提供的current-change事件绑定获取数据的方法。第二种方案请看最下方注释
        if(typeof p=='number') page.value = p

        try {
            let response = await Image.getImageListApi(page.value, limit.value)
            console.log(response);
            ImageClassList.value = response.list
            total.value = response.totalCount
        } catch (error) {

        }
    }
    getImageClass()
    //获取点击的下标
    const handerOnclick = (index)=>{
        active.value = index
    }

    //编辑图片列表
    const handerEdit = ()=>{
        console.log('编辑');
    }
    //删除图片列表
    const handerDelete = ()=>{
        console.log('删除');
    }


    //页面切换调取数据第二种方案，使用页码提供的两种方法上页和下页方法，具体查看官方文档
    // //点击分页上一页
    // const onClickPrev = ()=>{
    //     page.value--
    //     getImageClass()
    // }
    // //点击分页下一页
    // const onClickNext = ()=>{
    //     page.value++
    //     getImageClass()
    // }
</script>

<style scoped>
    .image-aside {
        position: relative;
    }

    .image-aside .top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow: auto;
    }

    .image-aside .bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        @apply flex items-center justify-center;
    }
</style>