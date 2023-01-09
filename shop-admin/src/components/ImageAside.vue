<template>
    <el-aside width="220px" class="image-aside">
        <div class="top">
            <!-- 图库列表的的抽离 -->
            <ImageList v-for="(item,index) in ImageClassList" :key="index" :active="activeId==item.id"
                @handerOnclick="handerOnclick(item)" @handerEdit="handerEdit(item)" @confirmEvent="confirmEvent(item)">
                {{item.name}}
            </ImageList>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, next" :total="total" @current-change="getImageClass" />
        </div>
    </el-aside>
    <!-- 抽屉组件 -->
    <z-drawer ref="drawer" @cancel="cancel" @onSubmit="onSubmit" :title="title" :loading="loading"
        :conifrmText="loading?'提交中...':'提交'">
        <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="相册名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="10000" />
            </el-form-item>
        </el-form>
    </z-drawer>
</template>

<script setup>
    import {toast }from '@/common/promptComponent'
    import ZDrawer from '@/components/ZDrawer.vue'
    import ImageApi from '@/api/image_class'
    import { ref, reactive, computed } from 'vue'
    import ImageList from '@/components/ImageList.vue'
    //页码
    const page = ref(1)
    //每页条数
    const limit = ref(10)
    //图片分类的数据
    const ImageClassList = ref([])
    //当前点击图片分类的Id
    const activeId = ref(0)
    //数组总条数
    const total = ref(0)
    //抽屉提交loading
    const loading = ref(false)
    //获取抽屉实例调用打开抽屉的方法
    const drawer = ref(null)
    //编辑时传递的Id 
    let editId = ref(0)
    //抽屉的标题
    let title = computed(() => editId.value ? '修改' : '新增')
    const form = reactive({
        name: '',
        order: 50
    })
    const rules = reactive({
        name: [{ required: true, message: '请输入相册名称', trigger: 'blur' },],
    })
    //获取图库列表数据
    const getImageClass = async (p = null) => {
        //页码切换调取不同数据，利用页码组件提供的current-change事件绑定获取数据的方法。第二种方案请看最下方注释
        if (typeof p == 'number') page.value = p

        try {
            let response = await ImageApi.getImageListApi(page.value, limit.value)
            ImageClassList.value = response.list
            let item = ImageClassList.value[0]
               //这里保持id的默认值并调用获取图片列表，保持imageMain组件可以直接渲染！
            if(item){
                handerOnclick(item)
            } 

            total.value = response.totalCount
        } catch (error) {

        }
    }
    getImageClass()
    const emit = defineEmits(['handerOnclick'])
    //获取点击的下标
    //向父组件穿一个方法。这样每次点击就会触发该方法发送Id
    const handerOnclick = (item) => {
        activeId.value = item.id
        emit('handerOnclick',item.id)
    }

    //编辑图片列表
    const handerEdit = (item) => {
        editId.value = item.id
        form.name = item.name
        form.order = item.order
        drawer.value.open()
    }
    //删除图片列表
    const confirmEvent = async (item) => {
        try {
            let res = await ImageApi.deleteImageListApi(item.id)
                toast('删除成功')
                getImageClass()
        } catch (error) {
            console.log(error);
        }
    }
    //打开抽屉
    const handerOpen = () => {
        //这里一定要等于0，因为修改再赋值后不等于0后面无法去判断
        editId.value = 0
        drawer.value.open()
    }
    //关闭抽屉方法
    const cancel = () => {
        drawer.value.close()
        form.name = ''
        form.order = 50
    }
    //获取form表单实例
    const formRef = ref(null)
    //新增与修改
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return false
            loading.value = true
            //判断editId.value是否等于0，来判断修改还是新增
            let fun = editId.value ? ImageApi.editImageListApi(editId.value, form) : ImageApi.addImageListApi(form)
            //返回的fun是个一个promis对象，利用特性共用一套逻辑
            fun.then(res => {
                toast(title.value + '成功')
                drawer.value.close()
                form.name = ''
                form.order = 50
                //这里有一个细节，判断是否是编辑，如果是编辑刷新当前页，如果是新增就回到第一页
                getImageClass(editId.value ? page.value : 1)
            }).finally(() => {
                loading.value = false
            })
        })
    }
    //要像父组件传递方法必须向父组件暴露事件
    defineExpose({
        handerOpen
    })


    // 2新增添加和修改方法用editId判断来调用，代码会多一些，但是整洁
    // const postAddImageClass = async () => {
    //     loading.value = true
    //     try {
    //         let response = await ImageApi.addImageListApi(form)
    //         console.log(response);
    //         loading.value = false
    //         toast('添加图片列表成功')
    //         drawer.value.close()
    //         form.name = ''
    //         getImageClass()
    //     } catch (error) {
    //         loading.value = false
    //         toast(error.response.data.msg || '未知错误', 'error')
    //     }
    // }

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