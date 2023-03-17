<template>
    <div>
        <el-card shadow="never" class="border-0">
            <template #header>
                <div>
                    <!-- 新增|刷新 -->
                    <ListHeader @added="added" @refreshList="refreshList" />
                </div>
            </template>
            <el-tree :data="tableData" node-key="id" :default-expanded-keys="defaultExpandedKeys"
                :props="{ label: 'name',children:'child' }">
                <template #default="{ node, data }">
                    <div class="custom-tree-node">
                        <div class="flex items-center justify-center">
                            <span>{{ data.name }}</span>
                        </div>
                        <div @click.stop="()=>{}">
                            <el-button type="primary" size="small" text @click="handelRecommendCalss(data)" :loading="data.goodsDarwerLoading">推荐产品</el-button>
                            <el-switch @change="amendAdminStatus($event,data)" :model-value="data.status" :active-value="1" :inactive-value="0" />
                            <el-button type="primary" size="small" text @click="amend(data)">修改</el-button>
                            <el-popconfirm title="确定要删除吗？" @confirm="handelDelete(data)" confirm-button-text="是"
                            cancel-button-text="否">
                            <template #reference>
                                <el-button type="primary" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>    
                        </div>
                    </div>
                </template>
            </el-tree>
        </el-card>
        <ZDrawer :title="title" :loading="loading" ref="drawerRef" @onSubmit="onSubmit" @cancel="cancel" @handelClose="handelClose">
            <el-form ref="ruleFormRef"  :rules="rules" :model="ruleForm" label-width="120px">
                  <el-form-item label="分类名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入分类名称"/>
                  </el-form-item>
            </el-form>
        </ZDrawer>
        <goodsDrawer ref="goodsDrawerRef"/>
    </div>
</template>

<script setup>
    import goodsDrawer from './components/goodsDrawer.vue'
    import IconSelect from "@/components/IconSelect.vue"
    import ZDrawer from '@/components/ZDrawer.vue'
    import { ref } from 'vue'
    import ListHeader from "@/components/ListHeader.vue"
    import categoryApi from '@/api/category.js'
    import { useInitTable, useInitForm } from "@/common/useCommon"
    const defaultExpandedKeys = ref([])
    const rulesList = ref([])
    //编辑，删除，获取列表
    const {
        getTableData,
        tableData,
        amendAdminStatus,
        handelDelete,
    } = useInitTable({
        getListApi: categoryApi.getcCategoryListApi,
        deleteApi:categoryApi.deleteCategoryApi,
        updateStatusApi:categoryApi.updateCategoryStatusApi,
        getListSuccess(res) {
            console.log(res);
            tableData.value = res
            tableData.value = res.map(o=>{
                o.goodsDarwerLoading = false 
                return o
            })
        }
    })
   //新增与修改
    const {
        loading,
        drawerRef,
        title,
        added,
        refreshList,
        onSubmit,
        cancel,
        amend,
        ruleForm,
        handelClose,
        rules,
        ruleFormRef
    } = useInitForm({
        getTableData,
        update:categoryApi.updateCategoryApi,
        create:categoryApi.categoryRoleApi,
        form:{
            name:''
        },
        rules:{
            name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        }
    })
    //表格上面的增加，实现回显
    const rowAdded = (data) =>{
        added()
        // console.log(data);
        ruleForm.rule_id = data.id
    }
    //推荐产品
    const goodsDrawerRef = ref(null)
   const handelRecommendCalss = (e)=>{
    goodsDrawerRef.value.open(e)
   }

</script>

<style scoped>
    :deep(.el-card),
    :deep(.el-card__header) {
        @apply border-0;
    }

    :deep(.el-card__header) {
        @apply pb-0;
    }

    :deep(svg) {
        font-size: 14px !important;
    }

    :deep(.el-tree-node__content) {
        padding: 20px;
    }

    .custom-tree-node {
        @apply flex-1 flex items-center justify-between pr-8;
    }
</style>