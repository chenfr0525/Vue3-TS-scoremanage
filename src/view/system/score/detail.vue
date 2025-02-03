<template>
  <div class="content">
  <chartViews  :obj="hightScore" title="成绩最高分"></chartViews>
  <chartViews :obj="averCourse" title="成绩平均分"></chartViews>
  </div>
</template>

<script setup lang="ts">
//导入chartview组件
import chartView from '../../../components/chartView.vue';
import chartViews from '../../../components/chartViews.vue';
//pinia使用
import { storeToRefs } from 'pinia';
import storeScore from "../../../store/score"
import { ref,computed } from 'vue';
const appStore = storeScore()
let { filteredList } = storeToRefs(appStore)
//成绩列表数据
const tableData = ref<any[]>([...filteredList.value]);
console.log(tableData.value);
//成绩平均分比例
function handlerData(arr:any){
  const obj={}
  arr.forEach(item => {
    const {cname}=item
    if(!obj[cname]){
    obj[cname]=[]
  }
  obj[cname].push(item.score)
  });
  return obj
}
const averCourse=computed(()=>{
  const data=handlerData(tableData.value)
  let dataObj=[]
  for(let key in data){
    const averge=(data[key].reduce((a,b)=>(+a)+(+b),0)/data[key].length).toFixed(2)
    
    dataObj.push({value:averge,name:key})
  }
  return dataObj
})
//成绩最高分
const hightScore=computed(()=>{
  const data=handlerData(tableData.value)
  let dataObj=[]
  for(let key in data){
    const averge=(data[key].sort((a,b)=>b-a))[0]
    
    dataObj.push({value:averge,name:key})
  }
  return dataObj
})


</script>

<style scoped>
.content {
  margin: 100px 20px;
  display: flex;
}
</style>