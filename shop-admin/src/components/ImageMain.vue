<template>
    <el-main class="image-main">
        <div class="top">
            <!-- <div v-for="(item,index) in imageList " :key="index">{{item.url}}</div> -->
            <el-row :gutter="20" class="rowBox">
                <el-col :span="6" class="mb-2" :offset="0" v-for="(item,index) in imageList " :key="index">
                    <el-card shadow="hover" class="rounded bt relative" :class="{'activeBoder':item.chcked}">
                        <el-image :preview-src-list="[item.url]" :initial-index="0" :src="item.url" fit="cover"
                            class="w-full h-[150px] elImg"></el-image>
                        <div class="image-title">{{item.name}}</div>
                        <div class='flex items-center justify-center p-2'>
                            <el-checkbox v-if="showChckbox" @change="handelchange(item)" v-model="item.chcked" class="pr-2"/>
                            <el-button type="primary" size="small" text @click="imageRen(item)">重命名</el-button>
                            <el-popconfirm width="171px" confirm-button-text="确定" cancel-button-text="取消"
                                icon-color="#ff9900" title="是否要删除该图片？" @confirm="deletImage(item)">
                                <template #reference>
                                    <el-button type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>

                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change='appointImageLis' />
        </div> 
        <z-drawer closeOnClickModal :btn="false" title="上传图片" destroyOnClose ref="drawerRef">
            <upload-image :data="{'image_class_id':listClassId}" @uploadSuccess="uploadSuccess"></upload-image>
        </z-drawer>
    </el-main>
</template>

<script setup>
    import UploadImage from '@/components/UploadImage.vue'
    import ZDrawer from '@/components/ZDrawer.vue'
    import ImageListApi from "@/api/image_manage"
    import { msgBox, toast } from '@/common/promptComponent'
    import { ref ,computed} from 'vue'
    import ImageApi from '@/api/image_class'
    const props = defineProps({
        showChckbox:{
            type:Boolean,
            default:false
        }
    })
    //分页总条数
    const total = ref(0)
    //分页页码
    const page = ref(1)
    //分页每页显示几条
    const limit = ref(10)
    //图片列表数据
    const imageList = ref([])
    //从ImageAside获取的图片分类的ID
    const listClassId = ref(0)
    //获取抽屉实例
    const drawerRef = ref(null)
    //两个子组件通讯
    //父组件调用了该方法，并传过来ID，这样就实现了从aside组件回去Id的方法了
    const getImageClassId = (id) => {
        listClassId.value = id
        appointImageLis()
    }

    //获取图片列表
    const appointImageLis = async (p) => {
        if (typeof p == 'number') {
            page.value = p
        }
        try {
            let res = await ImageApi.appointImageListApi(listClassId.value, page.value, limit.value)
            total.value = res.totalCount
            imageList.value = res.list.map(o=>{
                o.chcked = false
                return o
            })
        } catch (error) {
            console.log(error);
        }
    }
    //删除图片
    const deletImage = async (item) => {
        console.log(item);
        try {
            let res = await ImageListApi.imageDeleteApi({ ids: [item.id] })
            // console.log(res);
            toast('删除成功')
            appointImageLis()
        } catch (error) {
            console.log(error);
        }
    }
    //重命名
    const imageRen = async (item) => {
        try {
            let { value } = await msgBox('重命名', item.name)
            let res = await ImageListApi.imageAmendApi(item.id, { name: value })
            toast('修改成功')
            appointImageLis()
        } catch (error) {
            console.log(error);
        }
    }
    //选者图片
    let hasImage = computed(()=>imageList.value.filter(item=>item.chcked))
    console.log(hasImage);
    const handelchange = (item)=>{
          if (hasImage.value.length>1) {
            imageList.value.map(item=>item.chcked=false)
            item.chcked = true
          }
    }
     const uploadSuccess = ()=>{
        appointImageLis(1)
        drawerRef.value.close()
     }
    //上传图片抽屉打开
    const uploadingImageOpenDrawer = () => drawerRef.value.open()
    //暴露方法，利用ref调用
    defineExpose({
        getImageClassId,
        uploadingImageOpenDrawer
    })
</script>

<style lang="scss" scoped>
    .image-main {
        position: relative;

        .top {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 50px;
            overflow: auto;
        }

        .bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 50px;
            @apply flex items-center justify-center;
        }
    }

    :deep(.el-card__body) {
        padding: 0;
    }

    .rowBox {
        padding: 10px;
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .image-title {
        @apply p-1 bg-opacity-50 text-gray-100 text-sm truncate bg-gray-900;
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
    }
    .elImg{
        vertical-align: middle;
    }
    .bt{
        border: 1px solid transparent !important;
    }
    .activeBoder{
        box-sizing: border-box;
        border:1px solid blue !important;
    }
</style>