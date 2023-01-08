<template>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <span>
                    <el-check-tag @click="handerOnclick(item.type)" :checked="ischecked==item.type"
                        style="margin-right: 8px" v-for="(item,index) in options" :key="index">
                        {{item.title}}
                    </el-check-tag>
                </span>
            </div>
        </template>
        <div id="chart" style="width: 100%; height: 300px;"></div>
    </el-card>

</template>

<script setup>
    import * as echarts from 'echarts';
    import statistics from "@/api/statistics"
    import { ref, onMounted ,onBeforeUnmount} from 'vue'
    const ischecked = ref('week')
    const options = [
        {
            title: '近一个月',
            type: 'month'
        },
        {
            title: '近一周',
            type: 'week'
        },
        {
            title: '近24小时',
            type: 'hour'
        }
    ]
    const handerOnclick = (type) => {
        ischecked.value = type
        drawChart()
    }
    // 绘制图表
    const drawChart = () => {
        const option = {
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };
        myChart.showLoading();
        statistics.gteStatisticsApi3({ type: ischecked.value }).then(res => {
            console.log(res);
            option.xAxis.data = res.x
            option.series[0].data = res.y
                    // 绘制图表
            myChart.setOption(option);
        }).finally(()=>{
            myChart.hideLoading();
        })
    }
    var myChart = null
    onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('chart'));
    drawChart()
    })

</script>

<style scoped>

</style>