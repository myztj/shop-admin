<template>
   <ZDrawer ref="ZDrawerRef" title="推荐产品" conifrmText="关联" @onSubmit="onSubmit">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="goods_id" label="ID" width="180" />
        <el-table-column prop="cover" label="商品封面" width="180">
            <template #default="{row}">
                <el-image style="width: 70px; height: 70px" :src="row.cover" fit="fill"/>
              </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" />
        <el-table-column  label="操作">
            <template #default="{row}">
                <el-popconfirm title="是否要删除此记录？" @confirm="handelDelete(row)" confirm-button-text="是" cancel-button-text="否">
                    <template #reference>
                        <el-button type="primary" text :loading="row.loading">删除</el-button>
                    </template>
                  </el-popconfirm>
            </template>
        </el-table-column>
      </el-table>
   </ZDrawer>
   <ChoooseGoods ref="ChoooseGoodsRef"/>
</template>

<script setup>
    import { useInitTable, useInitForm } from '@/common/useCommon'
    import ChoooseGoods from '@/components/ChooseGoods.vue'
    import categoryApi from '@/api/category.js'
    import goodsApi from '@/api/goods.js'
   import ZDrawer from '@/components/ZDrawer.vue'
   import {ref} from 'vue'
   import {toast} from '@/common/promptComponent.js'
   const tableData = ref([])
   //Drawer 弹窗
   const ZDrawerRef = ref(null)
    //dialog 弹窗
    const ChoooseGoodsRef = ref(null)
   //打开弹窗
   const goodsId = ref(0)
   const open = (e)=>{
    goodsId.value = e.id
    e.goodsDarwerLoading = true
    //数据获取成功后打开弹窗
    getDate().then(res=>ZDrawerRef.value.open()).finally(()=>{
        e.goodsDarwerLoading = false
    })
   }
   //获取推荐产品数据
   function getDate(){
    return categoryApi.classRelevancyListApi(goodsId.value).then(res=>{
        tableData.value = res.map(o=>{
            o.loading = false
            return o
        })
    })
   }
   //弹窗关联
   const onSubmit = ()=>{
    ChoooseGoodsRef.value.open((goods_ids)=>{
        categoryApi.RelevancyGoodsApi({category_id:goodsId.value,goods_ids}).then(res=>{
            toast('关联成功')
            getDate()
        })
    })
   }
   //弹窗表格删除
   const handelDelete = (e)=>{
      console.log('删除所需Id=>',e.id);
      e.loading = true
      categoryApi.removeRelevancyApi(e.id).then(res=>{
          console.log(res);
          toast('删除成功')
          getDate()
      }).finally(()=>{
        e.loading = false
      })
   }
   defineExpose({
    open
   })

</script>

<style scoped>

</style>