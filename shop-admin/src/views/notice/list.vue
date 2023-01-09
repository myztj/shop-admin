<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex items-center justify-between">
                <el-button type="primary" size="small">新增</el-button>
                <el-tooltip class="box-item" effect="dark" content="刷新列表" placement="top">
                    <el-button text size="small">
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
            <el-table-column label="操作" align="content">
                <template #default="scope">
                    <el-button type="primary" size="small">修改</el-button>
                    <el-popconfirm
                     title="是否要删除该记录？"
                     confirm-button-text="是"
                     cancel-button-text="否"
                     @confirm="confirmDelete"
                     @cancel="cancelDelete"
                     width="172px"
                     >
                        <template #reference>
                            <el-button type="primary" size="small">删除</el-button>
                        </template>
                      </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>

<script setup>
    import { ref } from 'vue'
    const tableData = ref([])

    const getTableData = () => {
        tableData.value.push(
            {
                "id": 13,

                "title": "nip",

                "content": "nip\n",

                "order": 0,

                "create_time": "2022-06-06 14:40:11",

                "update_time": "2022-06-06 14:40:11"

            }
        )
    }
    getTableData()
     //确定删除
    const confirmDelete = ()=>{

    }
     //取消删除
    const cancelDelete = ()=>{

   }
</script>

<style scoped>

</style>