<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <!-- 新增|刷新 -->
                <ListHeader @added="added" @refreshList="getTableData"></ListHeader>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="角色名称" />
                <el-table-column prop="desc" label="角色描述" />
                <el-table-column prop="desc" label="状态">
                    <template #default="{row}">
                        <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
                            @change="amendAdminStatus($event,row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="content">
                    <template #default="{row}">
                        <el-button type="primary" size="small" text @click="setRole(row)">配置权限</el-button>
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
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-input :rows="5" v-model="ruleForm.desc" type="textarea" placeholder="请输入角色描述" />
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
        </ZDrawer>

        <!-- 权限弹窗 -->
        <ZDrawer :loading="treeLoading" destroyOnClose ref="roleDrawerRef" title="权限配置" @onSubmit="onRoleSubmit"
            @cancel="Rolecancel">
            <el-tree-v2 ref="treeRef" node-key="id" :check-strictly="checkStrictly" :data="treeList"
                :height="treeHeight" :props="{label:'name',children:'child'}" show-checkbox
                :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys"
                @check-change="handelCheck">
                <template #default="{ node ,data}">
                    <div class="flex items-center">
                        <el-tag :type="data.menu? '' : 'info'" class="mr-2">{{data.menu?'菜单':'权限'}}</el-tag>
                        <span> {{data.name}}</span>
                    </div>
                </template>
            </el-tree-v2>
        </ZDrawer>
    </div>
</template>

<script setup>
    import { toast } from "@/common/promptComponent"
    import accessApi from '@/api/authority_management'
    import ListHeader from "@/components/ListHeader.vue"
    import ZDrawer from '@/components/ZDrawer.vue'
    import roleApi from '@/api/role'
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
        getListApi: roleApi.getRoleListApi,
        deleteApi: roleApi.deleteRoleApi,
        updateStatusApi: roleApi.updateRoleStatusApi
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
            status: 1,
            desc: ''
        },
        rules: {
            name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' },]
        },
        update: roleApi.updateRoleApi,
        create: roleApi.createRoleApi
    })

    //配置角色
    //是否严格遵循父子互不关联
    const checkStrictly = ref(false)
    //是否显示Loading
    const treeLoading = ref(false)
    //获取tree的实例可以调用它暴露的方法
    const treeRef = ref(null)
    //获取tree权限列表
    const treeList = ref([])
    //动态设置高度
    const treeHeight = ref(0)
    //默认展开设置的Id
    const defaultExpandedKeys = ref([])
    //配置权限参数Id
    const setRoleId = ref(0)
    //默认选中的数组
    const defaultCheckedKeys = ref([])
    //配置权限的Id数组
    const rule_ids = ref([])
    //计算tree高度
    const setRole = (row) => {
        setRoleId.value = row.id
        treeHeight.value = window.innerHeight - 170
        checkStrictly.value = true
        accessApi.getRuleListApi().then(res => {
            console.log(res);
            treeList.value = res.list
            //默认展开
            defaultExpandedKeys.value = res.list.map(o => o.id)
            roleDrawerRef.value.open()
            setTimeout(() => {
                //默认选中
                defaultCheckedKeys.value = row.rules.map(o => o.id)
                checkStrictly.value = false
            }, 150);
        })
    }
    const handelCheck = () => {
        //1.element-ui提供了一个check事件，回调用剩余符展开，就能拿到选中和半选中的数据Id了
        // let { halfCheckedKeys, checkedKeys } = e[1]
        // rule_ids.value = [...halfCheckedKeys, ...checkedKeys]

        // 2.element-ui还给我提供了另外一个获取ID的方法就是下面getHalfCheckedKeys，getCheckedKeys两个暴露的方法
         rule_ids.value = [...treeRef.value.getHalfCheckedKeys(),...treeRef.value.getCheckedKeys()]
        //  console.log(rule_ids.value);
    }
    //权限配置提交
    const onRoleSubmit = () => {
        treeLoading.value = true
        roleApi.rolePermissionApi({ id: setRoleId.value, rule_ids: rule_ids.value }).then(res => {
            console.log(res);
            if (res) {
                treeLoading.value = false
                roleDrawerRef.value.close()
                toast('配置权限成功')
                getTableData()
            }
        }).finally(() => {
            treeLoading.value = false
        })
    }
    //权限配置取消
    const Rolecancel = () => {
        roleDrawerRef.value.close()
    }
</script>

<style scoped>
    :deep(.el-card__header) {
        padding-bottom: 0px;
        border-bottom: 0;
    }
</style>