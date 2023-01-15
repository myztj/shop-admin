<template>
    <div>
        <el-tabs v-model="searchForm.tab" class="demo-tabs" @tab-change="getTableData">
            <el-tab-pane :label="t.lable" :name="t.name" v-for="t in tbsData" :key="t.name"></el-tab-pane>
        </el-tabs>
        <el-card shadow="never">
            <template #header>
                <div>
                    <el-form :model="searchForm" label-width="80px" size="small">
                    <el-row :gutter="20">
                        <el-col :span="8" :offset="0">
                                <el-form-item label="关键词">
                                    <el-input v-model="searchForm.title" clearable placeholder="商品名称" />
                                </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="0" v-if="showSearch">
                                <el-form-item label="商品分类" prop="category_id">
                                    <el-select v-model="searchForm.category_id" placeholder="请选者商品分类" clearable>
                                        <el-option v-for="item in catesList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="showSearch ? 0 : 8" class="!flex items-center justify-end">
                            <el-button type="primary" size="small" @click="search">搜索</el-button>
                            <el-button size="small" class="ml-2" @click="resetSearchForm">重置</el-button>
                            <el-button size="small" text @click="showSearch=!showSearch">
                                {{showSearch?'收起':'展开'}}
                                <el-icon>
                                    <ArrowDownBold v-if="!showSearch" />
                                    <ArrowUpBold v-if="showSearch" />
                                </el-icon>
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
                    <!-- 新增|刷新 -->
                    <ListHeader @added="added" @refreshList="getTableData"></ListHeader>
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="avatar" label="商品" width="300">
                    <template #default="{row}">
                        <div class="flex">
                            <div class="pr-2">
                                <el-image class="rounded" style="width: 50px; height: 50px" :src="row.cover"/>
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
                <el-table-column prop="sale_count" label="实时销量" width="80"/>
                <el-table-column prop="order" label="审核状态" width="80">
                    <template #default="{row}">
                        <el-tag :type="row.status?'success':'danger'">{{row.status?'上架':'仓库'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="商品状态" width="120" v-if="searchForm.tab!='delete'">
                    <template #default="{row}">
                        <div class="flex flex-col" v-if="row.ischeck==0">
                            <el-button type="success" size="small" plain>审核通过</el-button>
                            <el-button class="mt-2 !ml-0" type="danger" size="small" plain>审核拒绝</el-button>
                        </div>
                        <span v-else class="flex justify-center"> {{row.ischeck==1?'通过':'拒绝'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="stock" label="总库存"/>
                <el-table-column label="操作">
                    <template #default="{row}">
                        <div v-if="searchForm.tab!='delete'">
                            <el-button type="primary" size="small" text @click="amend(row)">修改</el-button>
                            <el-button type="primary" size="small" text>商品规格</el-button>
                            <el-button type="primary" size="small" text>设置轮播图</el-button>
                            <el-button type="primary" size="small" text>商品详情</el-button>
                            <el-popconfirm title="确定要删除吗？" @confirm="handelDelete(row)" confirm-button-text="是"
                                cancel-button-text="否">
                                <template #reference>
                                    <el-button type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                            <span v-else>暂时无操作</span>
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
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="ruleForm.title" placeholder='请输入商品名称，最多60个字符'/>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <image-dialog v-model="ruleForm.cover"></image-dialog>
                </el-form-item>
                <el-form-item label="商品分类" prop="category_id">
                    <el-select v-model="ruleForm.category_id"  placeholder="请选者商品分类" clearable>
                        <el-option v-for="item in catesList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
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
    </div>
</template>

<script setup>
    import ListHeader from "@/components/ListHeader.vue"
    import ImageDialog from '@/components/ImageDialog.vue'
    import ZDrawer from '@/components/ZDrawer.vue'
    import goodsApi from '@/api/goods'
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
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        searchForm: {
            tab: 'all',
            title: '',
            category_id: null
        },
        getListApi: goodsApi.getGoodsList,
        deleteApi: goodsApi.deleteAllGoods,
        getListSuccess(res){
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
        update: goodsApi.updateGoods,
        create: goodsApi.createGoods,
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
        { lable: '审核中', name: 'checking' },
        { lable: '出售中', name: 'saling' },
        { lable: '已下架', name: 'off' },
        { lable: '库存预警', name: 'min_stock' },
        { lable: '回收站', name: 'delete' },
    ]
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

    :deep(.el-button) {
        padding: 0 20px 0 20px;
    }
</style>