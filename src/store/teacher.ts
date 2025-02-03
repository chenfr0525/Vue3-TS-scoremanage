import { defineStore } from "pinia"
import getLists from "../api/teacher"

interface Teacher {
  id: string;
  tno: string;
  tname: string;
  sex: string;
  age: number;
}

const storeTeacher = defineStore("teacher", {
  state: () => {
    return {
      userInfo: "userInfo",
      List: [] as Teacher[],
      filteredList: [] as Teacher[], // 过滤后的学生列表
      newList: {} as Teacher, // 用于存储新增学生信息的表单数据
      nextId: 15 // 用于自增id的初始值
    }
  },
  getters: {},
  actions: {
    getList() {
      getLists().then((rs: any) => {
        this.List = rs.data
        this.filteredList = rs.data; // 初始化时，过滤列表与完整列表相同
      })
    },
    // 新增学生信息
    add(Data: Teacher) {
      // 为新学生分配自增id
      Data.id = (this.nextId++).toString();
      // 将新学生信息添加到列表
      this.filteredList.push(Data);
      // 清空新增学生信息的表单数据
      this.newList = {} as Teacher;
    },
    // 根据条件查询学生信息
    search(searchConditions: any) {
      return this.List.filter((Teacher) => {
        return (
          (!searchConditions.tno || Teacher.tno === searchConditions.tno) &&
          (!searchConditions.tname || Teacher.tname.includes(searchConditions.tname)) &&
          (!searchConditions.sex || Teacher.sex === searchConditions.sex) &&
          (!searchConditions.age || Teacher.age === searchConditions.age)
        );
      });
    },
    // 删除单个学生信息
    delete(Id: string) {
      const index = this.filteredList.findIndex((Teacher) => Teacher.id === Id);
      if (index !== -1) {
        this.filteredList.splice(index, 1);
      }
      this.List = this.filteredList
    },
    // 批量删除学生信息
    deletes(Ids: string[]) {
      this.filteredList = this.filteredList.filter(Teacher => !Ids.includes(Teacher.id));
      this.List = this.filteredList
    },
    // 更新学生信息
    updateData(data: Teacher) {
      const index = this.filteredList.findIndex((Teacher) => Teacher.id === data.id);
      if (index !== -1) {
        this.filteredList[index] = { ...data };
      }
    }
  }
})
export default storeTeacher