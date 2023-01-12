<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <!-- 新增|刷新 -->
                <ListHeader @added="added" @refreshList="getTableData"></ListHeader>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="公告标题" />
                <el-table-column prop="update_time" label="发布时间" width="380" />
                <el-table-column label="操作" align="content" width="180">
                    <template #default="{row}">
                        <el-button type="primary" size="small" text @click="amend(row)">修改</el-button>
                        <el-popconfirm title="是否要删除该记录？" confirm-button-text="是" cancel-button-text="否"
                            @confirm="handelDelete(row)" width="172px">
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
        <ZDrawer destroyOnClose ref="drawerRef" :loading="loading" :title="title" @handelClose="handelClose"
            @onSubmit="onSubmit" @cancel="cancel">
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
    import ListHeader from "@/components/ListHeader.vue"
    import ZDrawer from '@/components/ZDrawer.vue'
    import noticeApi from '@/api/announceList'
    import { ref } from 'vue'
    //利用vue3组合API的特性粉装一个分页搜索的共用函数
    import { useInitTable ,useInitForm} from '@/common/useCommon'
    const {
        page,
        total,
        tableData,
        limit,
        getTableData,
        handelDelete
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        getListApi: noticeApi.getNoticeListApi,
        deleteApi:noticeApi.removeNoticeApi
    })
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
    } = useInitForm({
        getTableData,
        form:{
            title: '',
            content: '',
        },
        rules:{
            title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' },],
            content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' },]
        },
        update:noticeApi.amendNoticeApi,
        create:noticeApi.addNoticeApi
    })
    // 全局调用下
    getTableData()
</script>

<style scoped>
    :deep(.el-card__header) {
        padding-bottom: 0px;
        border-bottom: 0;
    }
</style>