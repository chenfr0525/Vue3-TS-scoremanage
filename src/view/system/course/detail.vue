<template>
  <div class="content">
  <chartView  :obj="courseNum" title="课程人数"></chartView>
  <chartViews :obj="courseNum" title="课程人数"></chartViews>
  </div>
</template>

<script setup lang="ts">
//导入chartview组件
import chartView from '../../../components/chartView.vue';
import chartViews from '../../../components/chartViews.vue';
//pinia使用
import { storeToRefs } from 'pinia';
import storeCourse from "../../../store/course"
import { ref,computed } from 'vue';
const courseStore=storeCourse()
let { filteredList } = storeToRefs(courseStore)
//课程列表数据
const tableData = ref<any[]>([...filteredList.value]);
// console.log(tableData.value);

//课程和课程人数比例
const courseNum=computed(()=>{
  const data=tableData.value.map(item=>{
    return {value:item.number,name:item.cname}
  })
  return data
})




</script>

<style scoped>
.content {
  margin: 100px 20px;
  display: flex;
}
</style>