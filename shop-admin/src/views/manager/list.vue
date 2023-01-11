<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <div>
                    <div class="flex justify-between mb-2">
                        <el-form :model="searchForm" label-width="80px" size="small" style="width:500px">
                            <el-form-item label="关键词">
                                <el-input v-model="searchForm.keyword" clearable placeholder="管理员昵称" />
                            </el-form-item>
                        </el-form>
                        <span>
                            <el-button type="primary" size="small" @click="search">搜索</el-button>
                            <el-button size="small" @click="resetSearchForm">重置</el-button>
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <el-button type="primary" size="small" @click="addManager">新增</el-button>
                        <el-tooltip class="box-item" effect="dark" content="刷新列表" placement="top">
                            <el-button text @click="refreshList">
                                <el-icon size="15">
                                    <Refresh />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="avatar" label="管理员" width="400">
                    <template #default="{row}">
                        <div class="flex items-center">
                            <el-avatar :size="40" :src="row.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                            </el-avatar>
                            <div class="pl-3">
                                <h6>{{row.username}}</h6>
                                <small>ID：{{row.id}}</small>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role.name" label="所属管理员" width="250" />
                <el-table-column prop="address" label="状态">
                    <template #default="{row}">
                        <el-switch v-model="row.status" :disabled="row.super==1" :loading="row.statusLoading"
                            @change="amendStatus($event,row)" :active-value="1" :inactive-value="0" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="{row}">
                        <div v-if="!row.super">
                            <el-button type="primary" size="small" text @click="amend(row)">修改</el-button>
                            <el-popconfirm title="确定要删除吗？" @confirm="confirmRemove(row)" confirm-button-text="是"
                                cancel-button-text="否">
                                <template #reference>
                                    <el-button type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                        <div v-else class="flex justify-around">
                            暂无操作
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex items-center justify-center pt-5">
                <el-pagination background layout="prev, pager, next" @current-change="getAnagementList"
                    :total="total" />
            </div>
        </el-card>
        <z-drawer @handelClose="handelClose" @cancel="cancel" @onSubmit="onSubmit" :loading="loading" :title="title"
            ref="drawerRef" destroyOnClose>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item label="选者头像" prop="avatar">
                    <image-dialog v-model="ruleForm.avatar"></image-dialog>
                </el-form-item>
                <el-form-item label="所属管理员" prop="role_id">
                    <el-select v-model="ruleForm.role_id" placeholder="请输入所属管理员">
                        <el-option v-for="item in rolesList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>
        </z-drawer>
    </div>
</template>

<script setup>
    import ImageDialog from '@/components/ImageDialog.vue'
    import { toast } from '@/common/promptComponent'
    import ZDrawer from '@/components/ZDrawer.vue'
    import anagementApi from '@/api/admin_anagement'
    import { reactive, ref, computed } from 'vue'
    //利用vue3组合API的特性粉装一个分页搜索的共用函数
    import { useInitTable } from '@/common/useCommon'
    const rolesList = ref([])
    const loading = ref(false)
    const { 
        searchForm, 
        page, 
        total, 
        tableData, 
        limit, 
        resetSearchForm, 
        getAnagementList 
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        searchForm:{
            keyword:''
        },
        getListApi:anagementApi.getManagerListApi,
        getListSuccess:(res)=>{
            tableData.value = res.list.map(item =>{
                item.statusLoading = false
                return item
            })
            rolesList.value = res.roles
            total.value = res.totalCount
        }
    })
    let ruleForm = reactive({
        username: '',
        password: '',
        role_id: null,
        status: 1,
        avatar: '',
    })
    const rules = reactive({
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        status: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
    })
    const swLoading = ref(false)
    const drawerRef = ref(null)
    const editId = ref(0)
    const title = computed(() => editId.value ? '编辑' : '新增')
    getAnagementList()
    //搜索
    const search = () => {
        getAnagementList()
    }
    //新增
    const addManager = () => {
        editId.value = 0
        drawerRef.value.open()
    }
    //刷新
    const refreshList = () => {
        tableData.value = []
        getAnagementList()
    }
    //抽屉提交
    const ruleFormRef = ref(null)
    const onSubmit = () => {
        loading.value = true
        ruleFormRef.value.validate(valid => {
            if (!valid) returna
            try {
                let func = editId.value ? anagementApi.amendManagerApi(editId.value, ruleForm) : anagementApi.addAanagerApi(ruleForm)
            func.then(res => {
                console.log(res);
                toast(title.value + '成功')
                cancel()
                getAnagementList()
                loading.value = false
            }) 
            } catch (error) {
                loading.value = false
                console.log(error);
            }
        })
        console.log(ruleForm);
    }
    //抽屉取消
    const cancel = () => {
        drawerRef.value.close()
    }
    //修改管理员状态
    const amendStatus = async (status, row) => {
        row.statusLoading = true
        // row.status= status
        try {
            let res = await anagementApi.amendManagerStatusApi(row.id, { status })
            console.log(res);
            toast('状态修改成功')
            getAnagementList()
            row.statusLoading = false
        } catch (error) {
            console.log(error);
            row.statusLoading = false
            getAnagementList()
        }
    }
    //修改
    const amend = (row) => {
        editId.value = row.id
        ruleForm.username = row.username
        ruleForm.role_id = row.role_id
        ruleForm.status = row.status
        ruleForm.avatar = row.avatar
        drawerRef.value.open()
    }
    //删除
    const confirmRemove = async (row) => {
        try {
            let res = await anagementApi.removeManagerApi(row.id)
            toast('删除成功')
            getAnagementList()
        } catch (error) {
            console.log(error);
        }
    }
    const handelClose = () => {
        console.log('关闭了');
        ruleForm.username = ''
        ruleForm.role_id = null
        ruleForm.status = 1
        ruleForm.avatar = ''
        ruleForm.password = ''
    }
</script>

<style scoped>
    :deep(.el-card) {
        border: 0;
    }

    :deep(.el-card__header) {
        border: 0;
        @apply pb-0;
    }

    :deep(.el-table__cell) {
        padding: 6px 0 !important;
    }
</style>