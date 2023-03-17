<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <!-- 搜索 -->
                <div>
                    <Search @search="search" @resetSearchForm="resetSearchForm">
                        <SearchItem label="关键词">
                            <el-input v-model="searchForm.title" clearable placeholder="要搜索的商品" />
                        </SearchItem>
                    </Search>
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="expand">
                    <template #default="{row}">
                        <div class="flex" style="width: 100%">
                            <div class="pl-14 pr-2">
                                <el-avatar :size="50" :src="row.user.avatar" />
                            </div>
                            <div style="width: 100%">
                                <p style="width: 100%" class="flex">
                                    <span>{{row.user.username}}</span><span
                                        class="pl-3 text-gray-400">{{row.user.update_time}}</span>
                                    <el-button v-if="!row.editReplyShow && !row.extra" size="small" class="ml-auto" @click="topReply(row)">回复</el-button>
                                </p>
                                <p>{{row.review.data}}</p>
                                <p class="mt-2">
                                    <el-image v-for="(src,index) in row.review.image" :key="index"
                                        style="width: 100px; height: 100px" :src="src" fit="fill" />
                                </p>
                                <p class="mt-4" v-for="(item,index) in row.extra" :key="index" style="width: 100%">
                                <div v-if="!row.editReplyShow"
                                    class="p-3 flex justify-between items-center bg-gray-100">
                                    <div>
                                        <h3 class="font-black">客服</h3>
                                        <p>{{item.data}}</p>
                                    </div>
                                    <div>
                                        <el-button type="info" size="small" @click.stop="editReply(row,item)">修改</el-button>
                                    </div>
                                </div>
                                </p>
                                <div v-if="row.editReplyShow">
                                    <p>
                                        <el-input v-model="data" :rows="2" type="textarea" placeholder="Please input" />
                                    </p>
                                    <p>
                                        <el-button type="primary" size="small" @click="reply(row)">回复</el-button>
                                        <el-button size="small" @click="row.editReplyShow=false">取消</el-button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="avatar" label="商品" width="400">
                    <template #default="{row}">
                        <div class="flex">
                            <el-image class="rounded" style="width: 50px; height: 50px" :src="row.goods_item.cover"
                                fit="fill" />
                            <div class="pl-3">
                                <small>{{row.goods_item.title}}</small>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role.name" label="评价信息" width="250">
                    <template #default="{row}">
                        <p>用户：<span>{{row.user.username}}</span></p>
                        <p>
                            <el-rate v-model="row.rating" />{{row.rating}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="评价时间" />
                <el-table-column prop="status" label="是否显示">
                    <template #default="{row}">
                        <el-switch v-model="row.status" :disabled="row.super==1" :loading="row.statusLoading"
                            @change="amendAdminStatus($event,row)" :active-value="1" :inactive-value="0" />
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex items-center justify-center pt-5">
                <el-pagination background layout="prev, pager, next" :current-page="page" @current-change="getTableData"
                    :total="total" />
            </div>
        </el-card>
    </div>
</template>

<script setup>
    import Search from '@/components/Search.vue'
    import SearchItem from '@/components/SearchItem.vue'
    import ListHeader from "@/components/ListHeader.vue"
    import ImageDialog from '@/components/ImageDialog.vue'
    import ZDrawer from '@/components/ZDrawer.vue'
    import commentApi from '@/api/comment'
    import { ref } from 'vue'
    import { toast } from '@/common/promptComponent'
    //利用vue3组合API的特性粉装一个分页搜索的共用函数
    import { useInitTable, useInitForm } from '@/common/useCommon'
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
            title: ''
        },
        getListApi: commentApi.getAppraiseListApi,
        updateStatusApi: commentApi.amendAppraiseStatusApi,
        getListSuccess: (res) => {
            tableData.value = res.list.map(item => {
                item.statusLoading = false
                item.editReplyShow = false
                return item
            })
            total.value = res.totalCount
        }
    })
    const order_id = ref(0)
    const data = ref('')
    //右上方回复
    const topReply = (row) => {
        data.value = ''
        row.editReplyShow = true
    }
    //修改
    const editReply = (row, item) => {
        order_id.value = row.id
        data.value = item.data
        row.editReplyShow = true
    }
    //回复
    const reply = (row) => {
        if (data.value=='') {
            return toast('回复内容不能为空')
        }
        commentApi.replyAppraiseApi(order_id.value, data.value).then(res => {
            console.log(res);
            toast('回复成功')
            row.editReplyShow = false
            getTableData()
        })
    }
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