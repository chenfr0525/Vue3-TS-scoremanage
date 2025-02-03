<template>
  <div class="content">
  <chartView  :obj="obj" title="性别"></chartView>
  <chartViews :obj="ageObj" title="年龄"></chartViews>
  </div>
</template>

<script setup lang="ts">
//导入chartview组件
import chartView from '../../../components/chartView.vue';
import chartViews from '../../../components/chartViews.vue';
//pinia使用
import { storeToRefs } from 'pinia';
import storeApp from "../../../store/app"
import { ref,computed } from 'vue';
const appStore = storeApp()
let { filteredList } = storeToRefs(appStore)
//学生列表数据
const tableData = ref<any[]>([...filteredList.value]);
// console.log(tableData.value);

//性别分类
const womanNum = computed(() => {
  return tableData.value.reduce((sum,item)=>{
    if(item.sex==="女"){
      sum++
    }
    return sum
  },0)
})
const manNum = computed(() => {
  return tableData.value.reduce((sum,item)=>{
    if(item.sex==="男"){
      sum++
    }
    return sum
  },0)
})
const obj=computed(()=>{
  return [
    {value:womanNum.value,name:"女"},
    {value:manNum.value,name:"男"}
  ]
})

//年龄分类
function ageHandle(age:number){
  return tableData.value.reduce((sum,item)=>{
    if(+item.age===age){
      sum++
    }
    return sum
  },0)
}

const ageObj=computed(()=>{
 return [
  {value:ageHandle(18),name:"18岁"},
  {value:ageHandle(19),name:"19岁"},
  {value:ageHandle(20),name:"20岁"},
  {value:ageHandle(21),name:"21岁"},
  {value:ageHandle(22),name:"22岁"},
  {value:ageHandle(23),name:"23岁"}
 ]
})

</script>

<style scoped>
.content {
  margin: 100px 20px;
  display: flex;
}
</style>