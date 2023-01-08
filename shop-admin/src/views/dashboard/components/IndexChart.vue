<template>
    <el-card shadow="never">
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
        <div ref="el" id="chart" style="width: 100%; height: 300px;"></div>
    </el-card>

</template>

<script setup>
    import * as echarts from 'echarts';
    import statistics from "@/api/statistics"
    import { ref, onMounted ,onBeforeUnmount} from 'vue'
    import { useResizeObserver } from '@vueuse/core'
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
    //图表数据切换
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
        //开启图表loading
        myChart.showLoading();
        //在掉哟经图表时调用数据接口，直接赋值
        statistics.gteStatisticsApi3({ type: ischecked.value }).then(res => {
            console.log(res);
            option.xAxis.data = res.x
            option.series[0].data = res.y
                    // 绘制图表
            myChart.setOption(option);
        }).finally(()=>{
             //关闭图表loading
            myChart.hideLoading();
        })
    }
    var myChart = null
    onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('chart'));
    drawChart()
    })


    //做一些优化,兼容打包后刷新白屏的情况，页面销毁前销毁图标示例。
    onBeforeUnmount(()=>{
        if(myChart) echarts.dispose(myChart)
    })

    //1.监听图表跟随容器大小变化而变化，这里使用了vueuse提供的useResizeObserver方法，可以监听某一个dom大小的变化
    const el = ref(null)
    useResizeObserver(el, () => myChart.resize())

     //2.也可以使用原生提供的监听屏幕大小变化发生时调用myChart.resize()注：（myChart.resize()是echarts官方提供的方法）
    // const onResize=()=>myChart.resize()
    // window.addEventListener('resize',onResize)
</script>

<style scoped>
:deep(.el-card){
    border: none !important;
}
</style>