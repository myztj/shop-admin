<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <!-- 新增|刷新 -->
                <ListHeader @added="added" @refreshList="getTableData"></ListHeader>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="会员等级" />
                <el-table-column prop="discount" label="折扣率(%)" align="center"/>
                <el-table-column prop="level" label="等级序号" align="center"/>
                <el-table-column prop="status" label="状态" align="center">
                    <template #default="{row}">
                        <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
                            @change="amendAdminStatus($event,row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
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
                <el-form-item label="等级名称" prop="name">
                    <el-input v-model="ruleForm.name"/>
                </el-form-item>
                <el-form-item label="等级权重" prop="level">
                    <el-input type="number" v-model="ruleForm.level" style="width: 50%;" />
                </el-form-item>
                <el-form-item label="是否禁用" prop="status">
                    <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="升级条件">
                    <div class="flex items-center">
                        <div class="mr-8">
                            <el-form-item label="累计消费满" prop="discount">
                                <el-input type="number" size="small" v-model="ruleForm.max_price" style="width: 150px;">
                                    <template #append>元</template>
                                  </el-input>
                            </el-form-item>
                            <span class="text-xs text-gray-400">设置会员等级所需要的累计消费必须大于等于0,单位：元</span>
                        </div>
                        <div>
                            <el-form-item label="累计次数满" prop="discount">
                                <el-input type="number" size="small" v-model="ruleForm.max_times" style="width: 150px;">
                                    <template #append>次</template>
                                  </el-input>
                            </el-form-item>
                            <span class="text-xs text-gray-400">设置会员等级所需要的购买量必须大于等于0,单位：笔</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="折扣率" prop="discount">
                        <el-input type="number" size="small" v-model="ruleForm.discount" style="width: 50%;">
                            <template #append>%</template>
                          </el-input>
                          <small class="text-gray-400">折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买</small>
                </el-form-item>
            </el-form>  
        </ZDrawer>
    </div>
</template>

<script setup>
    import { toast } from "@/common/promptComponent"
    import accessApi from '@/api/authority_management'
    import ListHeader from "@/components/ListHeader.vue"
    import ZDrawer from '@/components/ZDrawer.vue'
    import levelApi from '@/api/level'
    import { ref } from 'vue'
    //利用vue3组合API的特性粉装一个分页搜索的共用函数
    import { useInitTable, useInitForm } from '@/common/useCommon'
    const roleDrawerRef = ref(null)
    const {
        page,
        total,
        tableData,
        limit,
        getTableData,
        handelDelete,
        amendAdminStatus
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        getListApi: levelApi.getUserLevelListApi,
        deleteApi: levelApi.deleteUserLevelApi,
        updateStatusApi: levelApi.updateUserLevelStatusApi
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
        form: {
            name: '',
            level:0,
            status: 1,
            discount: 0,
            max_price:0,
            max_times:0
        },
        rules: {
            name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' },]
        },
        update: levelApi.updateUserLevelApi,
        create: levelApi.createUserLevelApi
    })

</script>

<style scoped>
    :deep(.el-card__header) {
        padding-bottom: 0px;
        border-bottom: 0;
    }
</style>