<template>
  <div id="main" ref="main"></div>
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


const main=ref(null)

let option = {
  title: {
    text: title+'占比',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: title,
      type: 'pie',
      radius: '50%',
      data: [
         ...obj
        // { value: 1048, name: 'Search Engine' },
        // { value: 735, name: 'Direct' },
        // { value: 580, name: 'Email' },
        // { value: 484, name: 'Union Ads' },
        // { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

onMounted(()=>{
  let myChart = echarts.init(main.value);
  myChart.setOption(option)

})
</script>

<style scoped>
#main {
  width: 600px;
  height:400px;
}
</style>