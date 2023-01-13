<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <!-- 新增|刷新 -->
                <ListHeader @added="added" @refreshList="getTableData"></ListHeader>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="优惠券名称" width="500">
                    <template #default="{row}">
                        <div :class="{'active':fromatStatus(row)=='领取中'}" class="border-dashed border py-2 px-4 rounded w-[330px] bg-gray-50">
                            <h5 class="font-bold text-gray-400">{{row.name}}</h5>
                            <div class="text-gray-400 text-xs py-1"><span>{{row.start_time}}</span>~<span>{{row.end_time}}</span></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template #default="{row}">
                        {{fromatStatus(row)}}
                    </template>
                </el-table-column>
                <el-table-column prop="value" label="优惠">
                    <template #default="{row}">
                        {{row.type==0 ? '满减' : '折扣'}}{{row.type==0?('￥'+row.value):(row.value+'折')}}
                    </template>
                </el-table-column>
                <el-table-column prop="total" label="发放数量" />
                <el-table-column prop="used" label="已使用" />
                <el-table-column label="操作" align="content">
                    <template #default="{row}">
                        <el-button type="primary" size="small" text @click="amend(row)" v-if="fromatStatus(row)=='未开始'">修改</el-button>
                        <el-popconfirm  v-if="fromatStatus(row)!='领取中'" title="是否要删除该优惠券？" confirm-button-text="是" cancel-button-text="否"
                            @confirm="handelDelete(row)" width="172px">
                            <template #reference>
                                <el-button type="primary" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm v-if="fromatStatus(row)=='领取中'" title="是否要优惠券失效？" confirm-button-text="是" cancel-button-text="否"
                            @confirm="amendAdminStatus(0,row)" width="172px">
                            <template #reference>
                                <el-button type="danger" plain size="small">失效</el-button>
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
                <el-form-item label="优惠券名称" prop="name">
                    <el-input style="width: 300px;" v-model="ruleForm.name" placeholder="优惠券名称" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio :label="0" border>满减</el-radio>
                        <el-radio :label="1" border>折扣</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="面值" prop="value">
                    <el-input style="width: 200px;" v-model="ruleForm.value" type="number">
                        <template #append>{{ruleForm.value? '折':'元'}}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="发行量" prop="total">
                    <el-input-number v-model="ruleForm.total" :min="0" :max="10000" />
                </el-form-item>
                <el-form-item label="最低使用价格" prop="min_price">
                    <el-input style="width: 200px;" v-model="ruleForm.min_price" type="number">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="ruleForm.order" :min="0" :max="10000" />
                </el-form-item>
                <el-form-item label="活动时间" prop="title">
                    <el-date-picker :editable="false" format="YYYY-MM-DD HH:mm:ss" v-model="timeValue" type="datetimerange" range-separator="~"
                        start-placeholder="开始日期" end-placeholder="结束日期" />
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input :rows="3" v-model="ruleForm.desc" type="textarea" placeholder="优惠券描述" />
                </el-form-item>
            </el-form>
        </ZDrawer>
    </div>
</template>

<script setup>
    import ListHeader from "@/components/ListHeader.vue"
    import ZDrawer from '@/components/ZDrawer.vue'
    import couponApi from '@/api/coupon'
    import { ref , computed} from 'vue'
    //利用vue3组合API的特性粉装一个分页搜索的共用函数
    import { useInitTable, useInitForm } from '@/common/useCommon'
    const timeValue = computed({
        get(){
            return ruleForm.start_time && ruleForm.end_time ? [ruleForm.start_time,ruleForm.end_time] : []
        },
        set(val){
            ruleForm.start_time = val[0]
            ruleForm.end_time = val[1]
        }
    })
    const {
        page,
        total,
        tableData,
        limit,
        getTableData,
        handelDelete,
        amendAdminStatus,
    } = useInitTable({
        //传入一个对象，第一个参数搜索栏需要的参数，第二个参数是获取数据的地址，第三个是一个回调，可以接收成功后的数据
        getListApi: couponApi.getCouponList,
        deleteApi: couponApi.deleteCoupon,
        updateStatusApi:couponApi.failureCoupon
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
            type: 0,
            value: 0,
            total: 100,
            min_price: 0,
            start_time: null,
            end_time: null,
            order: 50,
            desc:''
        },
        rules: {
            name: [{ required: true, message: '公告标题不能为空', trigger: 'blur' },],
        },
        update: couponApi.updateCoupon,
        create: couponApi.createCoupon,
        //格式化后台时间参数，变成时间戳
        disposeFormData(from){
            console.log(from);
            if(typeof from.start_time != 'number'){
                from.start_time=(new Date(from.start_time)).getTime()
            }
            if(typeof from.end_time != 'number'){
                from.end_time=(new Date(from.end_time)).getTime()
            }
            return from
        }
    })
    /*这里在表格行内写一个回调函数传回来来每行的数据，进行处理，返回该函数！也可以遍历表格的数据，在数据里添加一个字段
    例如，res.list.map(o=>{o.statusText = fromatStatus(o)  /return o})*/
    const fromatStatus= (row)=>{
        let text = '领取中'
        //拿到开始时间的时间戳
        let start_time = (new Date(row.start_time)).getTime()
        //拿到结束的时间戳
        let end_time = (new Date(row.end_time)).getTime()
        //现在的时间戳
        let now = (new Date()).getTime()
        if(now<start_time){
            text='未开始'
        }else if(now>end_time){
            text='已结束'
        }else if(row.status==0){
            text='已失效'
        }
        return text
    }


</script>

<style scoped>
    :deep(.el-card__header) {
        padding-bottom: 0px;
        border-bottom: 0;
    }
    .active{
        @apply border-red-200 bg-red-50 ;
    }
    .active span,.active div{
        @apply text-red-400;
    }
</style>
