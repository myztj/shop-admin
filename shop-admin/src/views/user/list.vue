<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <!-- 搜索 -->
                <div>
                    <Search :model="searchForm" @search="search" @resetSearchForm="resetSearchForm">
                        <SearchItem label="关键词">
                            <el-input v-model="searchForm.title" clearable placeholder="手机号/邮箱/会员昵称" />
                        </SearchItem>
                        <template #show>
                            <SearchItem label="会员等级">
                                <el-select v-model="searchForm.user_level_id" placeholder="会员等级" clearable>
                                    <el-option v-for="item in vipList" :key="item.id" :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </SearchItem>
                        </template>
                    </Search>
                    <!-- 新增|刷新 -->
                    <ListHeader @added="added" @refreshList="getTableData"></ListHeader>
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="avatar" label="会员" width="400">
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
                <el-table-column prop="user_level.name" label="会员等级" align="center">
                    <template #default="{row}">
                        {{row.user_level?.name || '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="update_time" label="登录注册" width="350" align="center">
                    <template #default="{row}">
                        <p v-if="row.last_login_time"><span>最后登录时间</span><span>{{row.last_login_time}}</span></p>
                        <p><span>注册时间</span><span>{{row.update_time}}</span></p>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="状态" width="100">
                    <template #default="{row}">
                        <el-switch v-model="row.status" :disabled="row.super==1" :loading="row.statusLoading"
                            @change="amendAdminStatus($event,row)" :active-value="1" :inactive-value="0" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="{row}">
                        <div v-if="!row.super">
                            <el-button type="primary" size="small" text @click="amend(row)">修改</el-button>
                            <el-popconfirm title="确定要删除吗？" @confirm="handelDelete(row)" confirm-button-text="是"
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
                <el-pagination background layout="prev, pager, next" :current-page="page" @current-change="getTableData"
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
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" />
                </el-form-item>
                <el-form-item label="选者头像" prop="avatar">
                    <image-dialog v-model="ruleForm.avatar"></image-dialog>
                </el-form-item>
                <el-form-item label="会员等级" prop="user_level_id">
                    <el-select v-model="ruleForm.user_level_id" placeholder="请选者会员等级">
                        <el-option v-for="item in vipList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="ruleForm.phone" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>
        </z-drawer>
    </div>
</template>

<script setup>
     import Search from '@/components/Search.vue'
    import SearchItem from '@/components/SearchItem.vue'
    import ListHeader from "@/components/ListHeader.vue"
    import ImageDialog from '@/components/ImageDialog.vue'
    import ZDrawer from '@/components/ZDrawer.vue'
    import userApi from '@/api/user.js'
    import { ref } from 'vue'
    //利用vue3组合API的特性粉装一个分页搜索的共用函数
    import { useInitTable , useInitForm} from '@/common/useCommon'
    //会员等级列表
    const vipList = ref([])
    //表格，分页，搜索,删除，修改状态
    const { 
        searchForm, 
        page, 
        total, 
        search,
        tableData, 
        limit, 
        resetSearchForm, 
        getTableData,
        amendAdminStatus,
        handelDelete,
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        searchForm:{
            limit:10,
            keyword:'',
            user_level_id:''
        },
        getListApi:userApi.getUserListApi,
        updateStatusApi:userApi.amendUserStatusApi,
        deleteApi:userApi.removeUserApi,
        getListSuccess:(res)=>{
            console.log(res);
            tableData.value = res.list.map(item =>{
                item.statusLoading = false
                return item
            })
            vipList.value = res.user_level
            total.value = res.totalCount
        }
    })
    //表单的新增、删除、表单清空，
    const {
        loading,
        ruleForm,
        rules,
        drawerRef,
        title,
        added,
        refreshList,
        ruleFormRef,
        onSubmit,
        cancel,
        amend,
        handelClose
    }  = useInitForm({
        //传入获取表格数据，要在方法创建之前才能穿入，就是在useInitTable后面
        getTableData,
        //传入表单所需数据
        form:{
            username: '',
            password: null,
            status: 1,
            nickname: '',
            phone: '',
            email: '',
            avatar: '',
            user_level_id: null

        },
        update:userApi.amendUserApi,
        create:userApi.addUserApi,
        rules:{
         username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
         role_id: [{ required: true, message: '选者所属管理员', trigger: 'click' },],
        }
    })
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