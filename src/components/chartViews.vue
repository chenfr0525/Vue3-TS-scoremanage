<template>
  <div>
    <h2>{{ title }}</h2>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
//导入echarts
import * as echarts from "echarts"
//获取数据
interface Props {
 obj:any,
 title:string
}
const { obj,title } = defineProps<Props>()

const valueData=ref<number[]>([])
obj.forEach((e:any) => {
  valueData.value.push(e.value)
});
const nameData=ref<string[]>([])
obj.forEach((e:any) => {
  nameData.value.push(e.name)
});

const container=ref(null)

let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [...nameData.value],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: title,
      type: 'bar',
      barWidth: '60%',
      data: [...valueData.value]
    }
  ]
}

onMounted(()=>{
  let myChart = echarts.init(container.value);
  myChart.setOption(option)

})
</script>

<style scoped>
#container {
  width: 600px;
  height:400px;
}
</style>