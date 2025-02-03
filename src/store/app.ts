import { defineStore } from "pinia"
import getLists from "../api/student"

interface Student {
  id: string;
  sno: string;
  sname: string;
  sex: string;
  age: number;
}

const storeApp = defineStore("app", {
  state: () => {
    return {
      userInfo: "userInfo",
      List: [] as Student[],
      filteredList: [] as Student[], // 过滤后的学生列表
      newList: {} as Student, // 用于存储新增学生信息的表单数据
      nextId: 14 // 用于自增id的初始值
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
    add(Data: Student) {
      // 为新学生分配自增id
      Data.id = (this.nextId++).toString();
      // 将新学生信息添加到列表
      this.filteredList.push(Data);
      // 清空新增学生信息的表单数据
      this.newList = {}as Student;
    },
    // 根据条件查询学生信息
    search(searchConditions: any) {
      return this.List.filter((student) => {
        return (
          (!searchConditions.sno || student.sno === searchConditions.sno) &&
          (!searchConditions.sname || student.sname.includes(searchConditions.sname)) &&
          (!searchConditions.sex || student.sex === searchConditions.sex) &&
          (!searchConditions.age || student.age === searchConditions.age)
        );
      });
    },
    // 删除单个学生信息
    delete(Id: string) {
      const index = this.filteredList.findIndex((student) => student.id === Id);
      if (index !== -1) {
        this.filteredList.splice(index, 1);
      }
      this.List = this.filteredList
    },
    // 批量删除学生信息
    deletes(Ids: string[]) {
      this.filteredList = this.filteredList.filter(student => !Ids.includes(student.id));
      this.List = this.filteredList
    },
    // 更新学生信息
    updateData(data: Student) {
      const index = this.filteredList.findIndex((student) => student.id === data.id);
      if (index !== -1) {
        this.filteredList[index] = { ...data };
      }
    }
  }
})
export default storeApp