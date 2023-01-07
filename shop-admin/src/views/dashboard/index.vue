<template>
    <div class="p-5">
       <ZCard :statisticsList1="statisticsList1"/>

       <IndexNav :navList="statisticsList2"/>
    </div>
</template>

<script setup>
    import IndexNav from './components/IndexNav.vue'
    import ZCard from './components/ZCard.vue'
    import statistics from "@/api/statistics"
    import {ref} from 'vue'
    const statisticsList1 = ref([])
    const statisticsList2 = ref([])
    const statisticsList3 = ref([])
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

    const gteStatistics3 = async ()=>{
         try {
            let res = await statistics.gteStatisticsApi3()
            console.log(res);
            statisticsList3.value = res
         } catch (error) {
            console.log(error);
         }
    }
    gteStatistics3()
</script>

<style scoped>

</style>