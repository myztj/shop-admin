<template>
    <div class="box">
      <!-- 订单组件 -->
      <!-- 要使用自定义权限时，如果组件有传值的数据，直接使用指令不生效，回报警告，需要在外层套一层div 不要使用template不生效 -->
      <div v-permission="['getStatistics1,GET']">
         <ZCard :statisticsList1="statisticsList1"/>
      </div>
    
      <!-- nav导航 -->
       <IndexNav/>

       <!-- 图标和交易 -->
        <el-row :gutter="20" class="mt-5">
         <el-col :span="12" :offset="0">
          <IndexChart v-permission="['getStatistics3,GET']"></IndexChart>
         </el-col>
         <el-col :span="12" :offset="0" v-permission="['getStatistics2,GET']">
          <IndexCard :cardData="goodsList" title="店铺及商品提示" tagTitle="店铺及商品提示"></IndexCard>
          <IndexCard :cardData="orderList" title="交易提示" tagTitle="店铺及商品提示"></IndexCard>
         </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import IndexChart from "./components/IndexChart.vue"
    import IndexCard from "./components/IndexCard.vue"
    import IndexNav from './components/IndexNav.vue'
    import ZCard from './components/ZCard.vue'
    import statistics from "@/api/statistics"
    import {ref} from 'vue'
    const statisticsList1 = ref([])
   //  const statisticsList2 = ref({})
    const goodsList = ref([])
    const orderList = ref([])
    //获取后台数据1
    const gteStatistics1 = async ()=>{
         try {
            let res = await statistics.gteStatisticsApi1()
            console.log(res);
            statisticsList1.value = res.panels
         } catch (error) {
            console.log(error);
         }
    }
    gteStatistics1()
    //获取后台数据2
    const gteStatistics2 = async ()=>{
         try {
            let res = await statistics.gteStatisticsApi2()
            console.log(res);
            let {goods,order} = res
            goodsList.value = goods
            orderList.value = order
         } catch (error) {
            console.log(error);
         }
    }
    gteStatistics2()

</script>

<style scoped>
   
</style>