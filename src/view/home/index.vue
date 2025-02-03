<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['0']" :router="true">
          <el-sub-menu :index="index.toString()" v-for="(item,index) in menuData">
            <template #title>
              <el-icon><message /></el-icon>{{ item.text }}
            </template>

            <el-menu-item-group>
            <el-menu-item :index="child.url" v-for="(child,chiIndex) in item.children">
              <template #title>{{child.text}}</template>
            </el-menu-item>
          </el-menu-item-group>

          </el-sub-menu>



        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ username }}</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <RouterView>

          </RouterView>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref,getCurrentInstance, onMounted } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'

//axios的包装函数
const constInstance=getCurrentInstance()
const {$request} = constInstance?.appContext.config.globalProperties

//菜单数据
const menuData=ref<any[]>([])
const username=ref<string>(localStorage.getItem('userInfo')||'匿名')

onMounted(()=>{
  $request.get("/mock/menu.json").then((rs:any)=>{
    if(rs.code>0){
      rs.data.forEach((element:any) => {
        menuData.value.push(element)
      });
      
    }else{
          ElMessage({
            message:"信息获取失败！",
            type:'error',
          })
    }
  })
})




const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
