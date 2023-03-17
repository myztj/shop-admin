<template>
    <div>
        <el-tabs v-model="searchForm.tab" class="demo-tabs" @tab-change="getTableData">
            <el-tab-pane :label="t.lable" :name="t.name" v-for="t in tbsData" :key="t.name"></el-tab-pane>
        </el-tabs>
        <el-card shadow="never">
            <template #header>
                <!-- 搜搜 -->
                <div>
                    <Search :model="searchForm" @search="search" @resetSearchForm="resetSearchForm">
                        <SearchItem label="订单编号">
                            <el-input v-model="searchForm.no" clearable placeholder="订单编号" />
                        </SearchItem>
                        <template #show>
                            <SearchItem label="收货人">
                                <el-input v-model="searchForm.name" clearable placeholder="收货人" />
                            </SearchItem>
                            <SearchItem label="手机号">
                                <el-input v-model="searchForm.phone" clearable placeholder="手机号" />
                            </SearchItem>
                            <SearchItem label="开始时间">
                                <el-date-picker value-format="yyyy-MM-dd" format="YYYY-MM-DD" v-model="searchForm.starttime" type="date" placeholder="开始时间" style="width: 500px;" />
                            </SearchItem>
                            <SearchItem label="结束时间">
                                <el-date-picker value-format="yyyy-MM-dd" format="YYYY-MM-DD" v-model="searchForm.endtime" type="date" placeholder="结束时间" style="width: 500px;" />
                            </SearchItem>
                        </template>
                    </Search>
                    <!-- 新增|刷新 -->
                    <ListHeader :newAdd="false" delete_all @delete_all="handelDelete_all" @refreshList="getTableData">

                    </ListHeader>
                </div>
            </template>
            <!-- 表格 -->
            <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
                style="width: 100%" v-loading="loading">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="avatar" label="商品" width="320">
                    <template #default="{row}">
                        <div class="flex items-center justify-between">
                            <div>
                                <p>订单号:</p>
                                <p class="text-xs text-gray-500">{{row.no}}</p>
                            </div>
                            <div>
                                <p>下单时间:</p>
                                <p class="text-xs text-gray-500">{{row.create_time}}</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center" v-for="(item,index) in row.order_items" :key="index">
                            <el-image class="rounded" style="width: 30px; height: 30px" :src="item.goods_item?.cover"
                                fit="fill" />
                            <p class="ml-2 text-blue-500">{{item.goods_item?.title}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="total_price" label="实付金额" width="180" align="center" />
                <el-table-column prop="order" label="买家" width="180" align="center">
                    <template #default="{row}">
                        <p>{{row.user.username || row.user.nickname}}</p>
                        <p>(用户ID：{{row.user.id}})</p>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="交易状态" v-if="searchForm.tab!='delete'">
                    <template #default="{row}">
                        <p class="flex">付款状态：<el-tag class="ml-2" size="small" :type="row.payment_method?'':'info'">
                                {{row.payment_method?'支付宝支付':'未支付'}}</el-tag>
                        </p>
                        <p class="flex my-1">发货状态：<el-tag class="ml-2" size="small" :type="row.ship_data?'':'info'">
                                {{row.ship_data?'已发货':'未发货'}}</el-tag>
                        </p>
                        <p class="flex">收货状态：<el-tag class="ml-2" size="small" :type="row.extra?'':'info'">
                                {{row.extra?'已收货':'未收货'}}</el-tag>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right">
                    <template #default="{row}">
                        <el-button type="primary" size="small" text>订单详情</el-button>
                        <el-button type="primary" size="small" text v-if="row.payment_method"
                            @click="goodsDetails(row)">订单发货</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="flex items-center justify-center pt-5">
                <el-pagination background layout="prev, pager, next" :current-page="page" @current-change="getTableData"
                    :total="total" />
            </div>
        </el-card>
        <z-drawer @handelClose="handelClose" @cancel="cancel" @onSubmit="onSubmit" :loading="loading" :title="title"
            ref="drawerRef" destroyOnClose>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="ruleForm.title" placeholder='请输入商品名称，最多60个字符' />
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <image-dialog v-model="ruleForm.cover"></image-dialog>
                </el-form-item>
                <el-form-item label="商品分类" prop="category_id">
                    <el-select v-model="ruleForm.category_id" placeholder="请选者商品分类" clearable>
                        <el-option v-for="item in catesList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品描述" prop="desc">
                    <el-input v-model="ruleForm.desc" type="textarea" placeholder='选填，商品卖点描述，例如：此款商品美观大方 性价比较高 不容错过' />
                </el-form-item>
                <el-form-item label="总库存" prop="stock">
                    <el-input v-model="ruleForm.stock" typ="numaber" style="width: 300px;">
                        <template #append>件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="库存预警" prop="min_stock">
                    <el-input v-model="ruleForm.min_stock" typ="numaber" style="width: 300px;">
                        <template #append>件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最低销售" prop="min_price">
                    <el-input v-model="ruleForm.min_price" typ="numaber" style="width: 300px;">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最低原价" prop="min_oprice">
                    <el-input v-model="ruleForm.min_oprice" typ="numaber" style="width: 300px;">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="库存显示" prop="stock_display">
                    <el-radio-group v-model="ruleForm.stock_display">
                        <el-radio :label="0" border>是</el-radio>
                        <el-radio :label="1" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否上架" prop="stock_display">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio :label="0" border>放入仓库</el-radio>
                        <el-radio :label="1" border>立即上架</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </z-drawer>
        <Danner @refreshData="getTableData" ref="dannerRef" />
        <ZDrawer ref="ZDrawerRef" title="设置商品详情">

        </ZDrawer>
    </div>
</template>

<script setup>
    import Danner from '@/views/goods/components/Danner.vue'
    import Search from '@/components/Search.vue'
    import SearchItem from '@/components/SearchItem.vue'
    import ListHeader from "@/components/ListHeader.vue"
    import ImageDialog from '@/components/ImageDialog.vue'
    import ZDrawer from '@/components/ZDrawer.vue'
    import orderApi from '@/api/order'
    import { ref } from 'vue'
    //利用vue3组合API的特性粉装一个分页搜索的共用函数
    import { useInitTable, useInitForm } from '@/common/useCommon'
    const catesList = ref([])
    const showSearch = ref(false)
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
        handelDelete_all,
        multipleTableRef,
        handleSelectionChange,
        handelUpdateStatus
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        searchForm: {
            tab: 'all',
            
        },
        getListApi: orderApi.getOrderList,
        handelDelete_all: orderApi.orderDelete_all,
        getListSuccess(res) {
            total.value = res.totalCount;
            tableData.value = res.list
            catesList.value = res.cates
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
    } = useInitForm({
        //传入获取表格数据，要在方法创建之前才能穿入，就是在useInitTable后面
        getTableData,
        //传入表单所需数据
        form: {
            title: '',
            category_id: null,
            cover: null,
            unit: '件',
            avatar: '',
            stock: 200,
            min_stock: 1,
            status: 1,
            stock_display: 1,
            min_price: 100,
            min_oprice: 1
        },
        rules: {

        }
    })
    //tbs点击事件
    const handleClick = (val) => {
        console.log(val);
    }
    //tbs参数
    //	订单类型：all全部，checking审核中，saling出售中，off已下架，min_stock库存预警，delete回收站
    const tbsData = [
        { lable: '全部', name: 'all' },
        { lable: '待付款', name: 'nopay' },
        { lable: '待发货', name: 'noship' },
        { lable: '待收货', name: 'shiped' },
        { lable: '已发货', name: 'received' },
        { lable: '已完成', name: 'finish' },
        { lable: '已关闭', name: 'closed' },
        { lable: '退款中', name: 'refunding' }
    ]
    const dannerRef = ref(false)
    const openSetBanner = (row) => {
        console.log(123);
        dannerRef.value.openDialog(row)
    }
    //商品详情
    const ZDrawerRef = ref(null)
    const goodsDetails = (row) => {
        console.log(row);
        ZDrawerRef.value.open()
    }
    // //支付方式
    // let payType={
    //         weixinPay:'微信支付',
    //         alipay:'支付宝支付',
    //         null:'未支付'
    //     }
    // const onPayType = (key)=>{
    //     return payType[key]
    // }
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