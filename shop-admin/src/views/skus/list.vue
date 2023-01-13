<template>
   <div>
      <el-card shadow="never">
         <template #header>
            <!-- 新增|刷新 -->
            <ListHeader delete_all @added="added" @delete_all="handelDelete_all" @refreshList="getTableData"></ListHeader>
         </template>
         <el-table ref="multipleTableRef" :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="规格名称" width="150"/>
            <el-table-column prop="default" label="规格值" width="250" />
            <el-table-column prop="order" label="排序" width="150" />
            <el-table-column prop="status" label="状态">
               <template #default="{row}">
                  <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
                            @change="amendAdminStatus($event,row)">
                        </el-switch>
               </template>
            </el-table-column>
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
            <el-form-item label="规格名称" prop="name">
               <el-input v-model="ruleForm.name" placeholder="请输入规格名称" />
            </el-form-item>
            <el-form-item label="排序" prop="order">
               <el-input-number v-model="ruleForm.order" :min="0" :max="10000" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
               <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0">
               </el-switch>
               
            </el-form-item>   
               <el-form-item label="规格值" prop="default">
                  <!-- 封装规格值 -->
                  <PublicTag v-model="ruleForm.default"></PublicTag>
               </el-form-item>
         </el-form>
      </ZDrawer>
   </div> 
</template>

<script setup>
   import PublicTag from '@/components/PublicTag.vue'
   import skusApi from '@/api/skus'
   import ListHeader from "@/components/ListHeader.vue"
   import ZDrawer from '@/components/ZDrawer.vue'
   import { ref } from 'vue'
   //利用vue3组合API的特性粉装一个分页搜索的共用函数
   import { useInitTable, useInitForm } from '@/common/useCommon'
   const {
      page,
      total,
      tableData,
      limit,
      getTableData,
      handelDelete,
      amendAdminStatus,
      handleSelectionChange,
      handelDelete_all,
      multipleTableRef
   } = useInitTable({
      //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
      getListApi: skusApi.getSkusListApi,
      updateStatusApi:skusApi.updateSkusStatisApi,
      deleteApi:skusApi.deleteAllSkus
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
         status: 0,
         name: '',
         order: 50,
         default: '',
      },
      rules: {
         name: [{ required: true, message: '规格名称不能为空', trigger: 'blur' },],
         default: [{ required: true, message: '规格值不能为空', trigger: 'blur' },]
      },
      update: skusApi.updateSkusApi,
      create: skusApi.createSkusApi
   })

</script>

<style scoped>
   :deep(.el-card__header) {
      padding-bottom: 0px;
      border-bottom: 0;
   }
</style>