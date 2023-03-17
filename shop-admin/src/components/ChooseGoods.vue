<template>
    <el-dialog title="商品选择" v-model="dialogVisible" width="80%" destroy-on-close>
        <div>
            <el-input v-model="searchForm.title" placeholder="商品名称" style="width: 150px;" class="mr-2" />
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <el-table ref="multipleTableRef" height="350px" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="avatar" label="商品">
                <template #default="{row}">
                    <div class="flex">
                        <div class="pr-2">
                            <el-image class="rounded" style="width: 50px; height: 50px" :src="row.cover" />
                        </div>
                        <ul class="flex-1">
                            <li>{{row.title}}</li>
                            <li><span class="text-red-500">￥{{row.min_price}}</span>
                                <el-divider direction="vertical" /><span class="text-xs">￥{{row.min_price}}</span>
                            </li>
                            <li class="text-sm text-gray-400">分类：{{row.category?row.category.name : '未分类' }}</li>
                            <li class="text-sm text-gray-400">创建时间：{{row.create_time}}</li>
                        </ul>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="stock" label="总库存" width="90" />
            <el-table-column prop="stock" label="价格（元）" width="150">
                <template #default="{row}">
                    <span class="text-red-500">{{row.min_price}}</span>
                    <el-divider direction="vertical" />
                    <span class="text-gray-500 text-xs">{{row.min_oprice}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center pt-5">
            <el-pagination background layout="prev, pager, next" :current-page="page" @current-change="getTableData"
                :total="total" />
        </div>
        <template #footer>
            <span>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup>
    import Search from '@/components/Search.vue'
    import goodsApi from '@/api/goods.js'
    import { useInitTable, useInitForm } from '@/common/useCommon'
    import { ref } from 'vue'
    const {
        searchForm,
        page,
        total,
        search,
        tableData,
        limit,
        ids,
        resetSearchForm,
        getTableData,
        multipleTableRef,
        handleSelectionChange,
        handelUpdateStatus
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        searchForm: {
            tab: 'saling',
            title: '',
        },
        getListApi: goodsApi.getGoodsList,
        deleteApi: goodsApi.deleteAllGoods,
        updateStatusApi:goodsApi.GoodsAreOnAndOff,
        getListSuccess(res) {
            total.value = res.totalCount;
            tableData.value = res.list
        }
    })
    const dialogVisible = ref(false)
    const cancel = () => {
        dialogVisible.value = false
    }
    const callbackFunction = ref(null)
    const open = (callback=null) => {
        callbackFunction.value = callback
        dialogVisible.value = true
    }
    const onSubmit = () => {
       if (typeof callbackFunction.value=='function') {
        callbackFunction.value(ids.value)
        cancel()
       }
    }

   defineExpose({
    open
   })
</script>

<style scoped>

</style>