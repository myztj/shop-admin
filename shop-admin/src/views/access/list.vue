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
                            <el-tag :type="data.menu?'':'info'">{{data.menu?'菜单':'权限'}}</el-tag>
                            <el-icon class="mx-2">
                                <component :is="data.icon" v-if="data.icon"></component>
                            </el-icon>
                            <span>{{ data.name }}</span>
                        </div>
                        <div @click.stop="()=>{}">
                            <el-switch @change="amendAdminStatus($event,data)" :model-value="data.status" :active-value="1" :inactive-value="0" />
                            <el-button type="primary" size="small" text @click="amend(data)">修改</el-button>
                            <el-button type="primary" size="small" text @click="rowAdded(data)">增加</el-button>
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
        <ZDrawer :title="title" :loading="loading" ref="drawerRef" @onSubmit="onSubmit" @cancel="cancel">
            <el-form ref="ruleFormRef"  :rules="rules" :model="ruleForm" label-width="120px">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader 
                    v-model="ruleForm.rule_id" 
                    :options="rulesList" 
                    :props="{value:'id',label:'name',children:'child',checkStrictly:true, emitPath:false}"
                    clearable />
                  </el-form-item>
                  <el-form-item label="菜单/规则" prop="menu">  
                    <el-radio-group v-model="ruleForm.menu">
                      <el-radio border :label="1">菜单</el-radio>
                      <el-radio border :label="0">规则</el-radio>
                    </el-radio-group>
                  </el-form-item> 
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name"  placeholder="请输入名称" style="width: 200px;"/>
                  </el-form-item>
                  <el-form-item label="后端规则" v-if="ruleForm.menu==0" prop="condition">
                    <el-input v-model="ruleForm.condition" placeholder="请输入后端规则"/>
                  </el-form-item>
                  <el-form-item label="请求方式" v-if="ruleForm.menu==0" prop="method">
                    <el-select v-model="ruleForm.method">
                      <el-option v-for="i in ['GET','POST','PUT','DELETE']" :label="i" :value="i" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="菜单图标" v-if="ruleForm.menu==1" prop="icon">
                   <IconSelect v-model="ruleForm.icon"></IconSelect>
                  </el-form-item>
                  <el-form-item label="前端路由" v-if="ruleForm.menu==1 && ruleForm.rule_id > 0" prop="frontpath">
                    <el-input v-model="ruleForm.frontpath" placeholder="请输入后端规则"/>
                  </el-form-item>
                  <el-form-item label="排序" prop="order">
                    <el-input-number v-model="ruleForm.order" :min="0" :max="1000" />
                  </el-form-item>
            </el-form>
        </ZDrawer>
    </div>
</template>

<script setup>
    import IconSelect from "@/components/IconSelect.vue"
    import ZDrawer from '@/components/ZDrawer.vue'
    import { ref } from 'vue'
    import ListHeader from "@/components/ListHeader.vue"
    import ruleApi from '@/api/authority_management'
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
        getListApi: ruleApi.getRuleListApi,
        deleteApi:ruleApi.deleteRuleApi,
        updateStatusApi:ruleApi.amendRuleStatusApi,
        getListSuccess(res) {
            console.log(res);
            tableData.value = res.list
            rulesList.value = res.rules
            defaultExpandedKeys.value = res.list.map(o => o.id)
            tableData.value = res.list.map(o=>{
                o.statusLoading = false 
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
        update:ruleApi.amendRuleApi,
        create:ruleApi.addRuleApi,
        form:{
            rule_id:0,
            menu:0,
            name:'',
            condition:'',
            method:'GTE',
            status:1,
            order:20,
            icon:'',
            frontpath:''
        },
        rules:{
            rule_id: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
            menu: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
            name: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
            condition: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
            method: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
            frontpath: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
        }
    })
    //表格上面的增加，实现回显
    const rowAdded = (data) =>{
        added()
        // console.log(data);
        ruleForm.rule_id = data.id
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