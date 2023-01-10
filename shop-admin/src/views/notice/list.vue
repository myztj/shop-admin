<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <div class="flex items-center justify-between">
                    <el-button type="primary" size="small" @click="newAddList">新增</el-button>
                    <el-tooltip class="box-item" effect="dark" content="刷新列表" placement="top">
                        <el-button text size="small" @click="getTableData">
                            <el-icon size="15">
                                <Refresh />
                            </el-icon>
                        </el-button>
                    </el-tooltip>
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="公告标题" />
                <el-table-column prop="update_time" label="发布时间" width="380" />
                <el-table-column label="操作" align="content" width="180">
                    <template #default="{row}">
                        <el-button type="primary" size="small" text @click="editNoticeList(row)">修改</el-button>
                        <el-popconfirm title="是否要删除该记录？" confirm-button-text="是" cancel-button-text="否"
                            @confirm="confirmDelete(row)" @cancel="cancelDelete" width="172px">
                            <template #reference>
                                <el-button type="primary" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex items-center justify-center pt-5">
                <el-pagination background layout="prev, pager, next" @current-change="getTableData" :total="total" />
            </div>
        </el-card>
        <ZDrawer destroyOnClose ref="drawerRef" :loading="loading" :title="title" @handelClose="handelClose" @onSubmit="onSubmit" @cancel="cancel">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                 status-icon>
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入公告标题" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input :rows="5" v-model="ruleForm.content" type="textarea" placeholder="请输入公告内容" />
                </el-form-item>
            </el-form>
        </ZDrawer>
    </div>
</template>

<script setup>
    import {toast} from '@/common/promptComponent'
    import ZDrawer from '@/components/ZDrawer.vue'
    import noticeApi from '@/api/announceList'
    import { ref, reactive,computed } from 'vue'
    const total = ref(0)
    const page = ref(1)
    //修改列表所需Id
    const editId = ref(0)
    //表格数据
    const tableData = ref([])
    //loading状态
    const loading = ref(false)
    const title = computed(() => editId.value ? '编辑' : '新增')
    //获取抽屉实例
    const drawerRef = ref(null)
    //form表单参数
    const ruleForm = reactive({
        title: '',
        content: '',
    })
    //验证规则
    const rules = reactive({
        title:[ {required: true, message: '公告标题不能为空', trigger: 'blur' },],
        content:[ {required: true, message: '公告内容不能为空', trigger: 'blur' },]
    })

    //获取了列表数据
    const getTableData = async (p) => {
        if (typeof p == 'number') page.value = p
        try {
            let res = await noticeApi.getNoticeListApi(page.value)
            console.log(res);
            total.value = res.totalCount
            tableData.value = res.list
        } catch (error) {
            console.log(error);
        }
    }
    //全局调用下
    getTableData()
    //新增
    const newAddList = () => {
        editId.value = 0
        drawerRef.value.open()
    }
    //编辑
    const editNoticeList = (item) => {
        editId.value = item.id
        drawerRef.value.open()
        ruleForm.title=item.title
        ruleForm.content=item.content
    }
    //提交
    const ruleFormRef = ref(null)
    const onSubmit = ()=>{
        loading.value = true
        ruleFormRef.value.validate(valid=>{
             if(!valid) return
             //判断是修改还是新增
            let func = editId.value ? noticeApi.amendNoticeApi(editId.value,ruleForm) : noticeApi.addNoticeApi(ruleForm)
            func.then(res=>{
                toast(title.value+'成功')
                //修改刷新当前也，新增刷新到第一页
                getTableData(editId.value?false:1)
                drawerRef.value.close()
                loading.value=false
             })
        }).finally(()=>{
            loading.value=false
        })
    }
    //取消
    const cancel = ()=>{
        console.log('触发了');
        drawerRef.value.close()
    }
    //确定删除
    const confirmDelete = async (row) => {
        console.log(row);
        try {
            let res = await noticeApi.removeNoticeApi(row.id)
            toast('删除成功')
            getTableData()
        } catch (error) {
            console.log(error);
        }
    }
    //取消删除
    const cancelDelete = () => {
     
    }
    //抽屉关闭回到清除表单
    const handelClose = ()=>{
       for(let i in ruleForm){
            ruleForm[i] = ''
        }
    }
</script>

<style scoped>
    :deep(.el-card__header) {
        padding-bottom: 0px;
        border-bottom: 0;
    }
</style>