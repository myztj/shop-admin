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
                            <el-button size="small" @click="reset">重置</el-button>
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <el-button type="primary" size="small" @click="addManager">新增</el-button>
                        <el-tooltip class="box-item" effect="dark" content="刷新列表" placement="top">
                            <el-button text>
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
                    <image-dialog></image-dialog>
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
    import { reactive, ref ,computed} from 'vue'
    const searchForm = reactive({
        keyword: ''
    })
    let ruleForm = reactive({
        username: '',
        password: '',
        role_id: null,
        status: 1,
        avatar: '',
    })
    const rules = reactive({
        username: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
        password: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
        role_id: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
        status: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
        avatar: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },]
    })
    const swLoading = ref(false)
    const limit = ref(10)
    const page = ref(1)
    const total = ref(0)
    const tableData = ref([])
    const rolesList = ref([])
    const drawerRef = ref(null)
    const editId = ref(0)
    const title = computed(() => editId.value ? '编辑' : '新增')
    const loading = ref(false)
    const getAnagementList = async (p) => {
        if (typeof p == 'number') page.value = p
        try {
            let res = await anagementApi.getManagerListApi(page.value, { limit: limit.vlaue, keyword: searchForm.keyword })
            console.log(res);
            tableData.value = res.list
            rolesList.value = res.roles
            tableData.value.map(item => item.statusLoading = false)
            console.log(tableData.value);
            total.value = res.totalCount
        } catch (error) {
            console.log(error);
        }
    }
    getAnagementList()
    //搜索
    const search = () => {
        getAnagementList()
    }
    //重置
    const reset = () => {
        searchForm.keyword = ''
        getAnagementList()
    }
    //新增
    const addManager = () => {
        drawerRef.value.open()
    }
    //抽屉提交
    const onSubmit = () => {

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
            let res = await anagementApi.amendManagerApi(row.id, { status })
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
        console.log(row);
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

    //关闭抽屉的回调清空form表单
    const handelClose = () => {
        ruleForm = {
            username: '',
            password: '',
            role_id: null,
            status: 1,
            avatar: '',
        }
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