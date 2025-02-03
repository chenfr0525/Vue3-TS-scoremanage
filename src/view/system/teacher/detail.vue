<template>
  <div class="content">
    <chartView :obj="obj" title="性别"></chartView>
    <chartViews :obj="ageObj" title="年龄"></chartViews>
  </div>
</template>

<script setup lang="ts">
//导入chartview组件
import chartView from '../../../components/chartView.vue';
import chartViews from '../../../components/chartViews.vue';
//pinia使用
import { storeToRefs } from 'pinia';
import storeTeacher from "../../../store/teacher"
import { ref, computed } from 'vue';
const teacherStore = storeTeacher()
let { filteredList } = storeToRefs(teacherStore)
//教师列表数据
const tableData = ref<any[]>([...filteredList.value]);
// console.log(tableData.value);
//性别分类
const womanNum = computed(() => {
  return tableData.value.reduce((sum, item) => {
    if (item.sex === "女") {
      sum++
    }
    return sum
  }, 0)
})
const manNum = computed(() => {
  return tableData.value.reduce((sum, item) => {
    if (item.sex === "男") {
      sum++
    }
    return sum
  }, 0)
})
const obj = computed(() => {
  return [
    { value: womanNum.value, name: "女" },
    { value: manNum.value, name: "男" }
  ]
})
//年龄分类
function ageHandle(age: number) {
    return tableData.value.reduce((sum,item)=>{
    if(+item.age>=age-5 && +item.age<age+5){
      sum++
    }
       return sum
    },0)
}

const ageObj = computed(() => {
  return [
    { value: ageHandle(30), name: "25~35岁" },
    { value: ageHandle(40), name: "35~45岁" },
    { value: ageHandle(50), name: "45~55岁" },
    { value: ageHandle(60), name: "55~65岁" }
  ]
})

</script>

<style scoped>
.content {
  margin: 100px 20px;
  display: flex;
}
</style>