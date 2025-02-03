import { defineStore } from "pinia"
import getLists from "../api/course"

interface Course {
  id: string;
  cno: string;
  cname: string;
  tname: string;
  number: number;
}

const storeCourse = defineStore("course", {
  state: () => {
    return {
      userInfo: "userInfo",
      List: [] as Course[],
      filteredList: [] as Course[], // 过滤后的学生列表
      newList: {} as Course, // 用于存储新增学生信息的表单数据
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
    add(Data: Course) {
      // 为新学生分配自增id
      Data.id = (this.nextId++).toString();
      // 将新学生信息添加到列表
      this.filteredList.push(Data);
      // 清空新增学生信息的表单数据
      this.newList = {} as Course;
    },
    // 根据条件查询学生信息
    search(searchConditions: any) {
      return this.List.filter((Course) => {
        return (
          (!searchConditions.cno || Course.cno === searchConditions.cno) &&
          (!searchConditions.cname || Course.cname.includes(searchConditions.cname)) &&
          (!searchConditions.tname || Course.tname === searchConditions.tname) &&
          (!searchConditions.number || Course.number === searchConditions.number)
        );
      });
    },
    // 删除单个学生信息
    delete(Id: string) {
      const index = this.filteredList.findIndex((Course) => Course.id === Id);
      if (index !== -1) {
        this.filteredList.splice(index, 1);
      }
      this.List = this.filteredList
    },
    // 批量删除学生信息
    deletes(Ids: string[]) {
      this.filteredList = this.filteredList.filter(Course => !Ids.includes(Course.id));
      this.List = this.filteredList
    },
    // 更新学生信息
    updateData(data: Course) {
      const index = this.filteredList.findIndex((Course) => Course.id === data.id);
      if (index !== -1) {
        this.filteredList[index] = { ...data };
      }
    }
  }
})
export default storeCourse