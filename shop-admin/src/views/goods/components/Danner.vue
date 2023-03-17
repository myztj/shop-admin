<template>
    <el-drawer title="设置轮播图" v-model="isopenDialog" direction="rtl" size="50%" :destroy-on-close="true" :show-close="true">
       <el-form :model="form" label-width="80px">
        <el-form-item>
            <ImageDialog :limit="limit" v-model="form.banners"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="submit">提交</el-button>
        </el-form-item>
       </el-form>

    </el-drawer>
</template>

<script setup>
    import{toast} from '@/common/promptComponent'
    import ZDrawer from "@/components/ZDrawer.vue"
    import goodsApi from '@/api/goods.js'
    import ImageDialog from '@/components/ImageDialog.vue'
import {ref,reactive} from 'vue'
const isopenDialog = ref(false)
const form = reactive({
    banners:[]
})
const limit= ref(9)
const goodsId = ref(0)
const openDialog = (row)=>{
    goodsId.value = row.id
    goodsApi.checkGoodsData(goodsId.value).then(res=>{
        console.log(res);
        form.banners = res.goodsBanner.map(o=>o.url)
    })
    isopenDialog.value = true
}
const emit = defineEmits(['refreshData'])
const submit= ()=>{
    goodsApi.setSlideshow(goodsId.value,form).then(res=>{
        toast('设置轮播图成功')
        isopenDialog.value = false
        emit('refreshData')
    })
}
defineExpose({
    openDialog
})
</script>

<style scoped>

</style>