<template>
    <div class="p-5">
      <!-- 订单组件 -->
       <ZCard :statisticsList1="statisticsList1"/>
      <!-- nav导航 -->
       <IndexNav/>

       <!-- 图标和交易 -->
        <el-row :gutter="20" class="mt-5">
         <el-col :span="12" :offset="0">
          <IndexChart></IndexChart>
         </el-col>
         <el-col :span="12" :offset="0"></el-col>
        </el-row>
        
    </div>
</template>

<script setup>
    import IndexChart from "./components/IndexChart.vue"
    import IndexNav from './components/IndexNav.vue'
    import ZCard from './components/ZCard.vue'
    import statistics from "@/api/statistics"
    import {ref} from 'vue'
    const statisticsList1 = ref([])
    const statisticsList2 = ref([])
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
            statisticsList2.value = res
         } catch (error) {
            console.log(error);
         }
    }
    gteStatistics2()

</script>

<style scoped>

</style>