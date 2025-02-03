<template>
  <div class="tablebody">
      <el-card shadow="always">
          <div class="card-header">
              <span>成绩信息管理</span>
              <div>
                  <el-button type="success" :icon="Plus" @click="Create">新增</el-button>
                  <el-button type="danger" :icon="Delete" @click="BatchDelete">批量删除</el-button>
              </div>
          </div>

          <el-form :inline="true" :model="searchForm" style="margin: 20px 0;">
              <el-form-item label="课程名:">
                  <el-input v-model="searchForm.cname" placeholder="课程名" />
              </el-form-item>
              <el-form-item label="姓名:">
                  <el-input v-model="searchForm.sname" placeholder="姓名" />
              </el-form-item>
              <el-form-item label="成绩:">
                  <el-input v-model="searchForm.score" placeholder="成绩" />
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSearch" :icon="Search">查询</el-button>
              </el-form-item>
          </el-form>

          <el-table :data="tableData" class="tablelist" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column fixed prop="id" label="id" width="80" />
              <el-table-column prop="cname" label="课程名" width="120" />
              <el-table-column prop="sname" label="姓名" width="120" />
              <el-table-column prop="score" label="成绩" width="120" />
              <el-table-column fixed="right" label="操作" width="120">
                  <template #default="scope">
                      <el-button link type="primary" size="small"
                          @click="showDialog(scope.row.id); dialogVisible = true;">编辑</el-button>
                      <el-button link type="danger" size="small" @click="DeleteOne(scope.row.id)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>

          <el-pagination class="mypage" @current-change="handleCurrentChange" background
              layout="total, prev, pager, next, jumper" :total="totalSize" :page-size="pageSize">
          </el-pagination>
      </el-card>
  </div>
  <!-- 弹出框 -->
  <el-dialog v-model="dialogVisible" title="编辑信息" width="500">
      <div class="content">
          <el-form :model="form" label-width="auto" style="max-width: 600px">
              <el-form-item label="课程名">
                  <el-input v-model="form.cname" />
              </el-form-item>
              <el-form-item label="姓名">
                  <el-input v-model="form.sname" />
              </el-form-item>
              <el-form-item label="成绩">
                  <el-input v-model="form.score" />
              </el-form-item>
          </el-form>
      </div>
      <template #footer>
          <div class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="onSubmit(form)">
                  确定
              </el-button>
          </div>
      </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Delete, Plus, Search } from '@element-plus/icons-vue'
import { ref, reactive, getCurrentInstance, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'

//pinia使用
import { storeToRefs } from 'pinia';
import storeScore from "../../../store/score"
const scoreStore = storeScore()
let { List, filteredList } = storeToRefs(scoreStore)
scoreStore.getList()


//axois的函数
const constInstance = getCurrentInstance();
const { $request } = constInstance?.appContext.config.globalProperties;

//查询条件的表单
const searchForm = ref({ id: '', cname: '', sname: '', score: '' })
const selectedIds = ref<string[]>([]); // 用于存储选中的成绩id
const pageSize = ref<number>(5)// 每页显示的数量
const pageIndex = ref<number>(1)// 当前页码
const totalSize = ref<number>(0)// 总数据量
const totalPage = computed(() => {
  return Math.ceil(totalSize.value / pageSize.value)
})
const tableData = ref<any[]>([]);//表格数据

/**读取表格数据的函数 */
const getByPage = () => {
  // 确保总页数不小于当前页码
  if (pageIndex.value > totalPage.value) {
      pageIndex.value = 1; // 如果超出范围，则重置为第一页
  }
  // 计算当前页的数据范围
  const start = (pageIndex.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  // 更新总数据量
  totalSize.value = filteredList.value.length;// 使用过滤后的数据列表
  // 判断是否有数据
  if (filteredList.value.length) {
      // 截取当前页的数据
      tableData.value = filteredList.value.slice(start, end);
  } else {
      tableData.value = [];
      ElMessage({
          message: "无法找到数据",
          type: "error",
      });
  }
}

// 改变页码时的处理
const handleCurrentChange = (curIndex: number) => {
  pageIndex.value = curIndex
  getByPage();
}

// 查询成绩信息
const onSearch = () => {
  const results = scoreStore.search(searchForm.value);
  filteredList.value = results; // 更新过滤后的数据列表
  totalSize.value = results.length; // 更新过滤后的数据量
  pageIndex.value = 1; // 重置为第一页
  getByPage()
  ElMessage.success('查询成功');
}

onMounted(() => {
  getByPage()
})

//新增
const Create = () => {
  if (!searchForm.value.cname || !searchForm.value.sname || !searchForm.value.score) {
      ElMessage.error('请填写完整的成绩信息');
      return;
  }
  // 调用Pinia store中的新增方法
  scoreStore.add({ ...searchForm.value });
  ElMessage.success('成绩信息创建成功');
  // 清空表单
  searchForm.value = { cname: '', sname: '', score: '' };
  getByPage()
}

//删除单个信息
const DeleteOne = (id: string) => {
  scoreStore.delete(id);
  ElMessage.success('成绩信息删除成功');
  getByPage(); // 重新获取成绩列表
}

// 处理表格选中事件
const handleSelectionChange = (val) => {
  selectedIds.value = val.map((score) => score.id);
}
// 批量删除
const BatchDelete = () => {
  if (selectedIds.value.length === 0) {
      ElMessage.warning('请选择要删除的成绩');
      return;
  }
  scoreStore.deletes(selectedIds.value);
  ElMessage.success('成绩信息删除成功');
  selectedIds.value = []; // 清空选中的成绩id
  getByPage(); // 重新获取成绩列表
}

//编辑信息
interface Score {
  id: string;
  cname: string;
  sname: string;
  score: number;
}
const form = reactive<Score>({
  id: '',
  cname: '',
  sname: '',
  score: 0
})
const dialogVisible = ref<boolean>(false)
const onSubmit = (form: Score) => {
  if (form) {
      scoreStore.updateData(form);
      ElMessage.success('成绩信息更新成功');
      dialogVisible.value = false; // 关闭对话框
      getByPage(); // 重新获取成绩列表
  } else {
      ElMessage.error('请选择要更新的成绩');
  }
}
function showDialog(id: string) {
  const score = List.value.filter(item => {
      return item.id === id
  })
  console.log(score);
  form.id = id
  form.cname = score[0].cname
  form.sname = score[0].sname
  form.score = score[0].score
}

</script>

<style scoped>
.mypage {
  margin-top: 20px;
}

.tablebody {
  margin: 20px;
}

.tablelist {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #25476a;
  border-radius: 3px;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>