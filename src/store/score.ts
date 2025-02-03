import { defineStore } from "pinia"
import getLists from "../api/score"

interface Score {
  id: string;
  cname: string;
  sname: string;
  score: number;
}

const storeScore = defineStore("score", {
  state: () => {
    return {
      userInfo: "userInfo",
      List: [] as Score[],
      filteredList: [] as Score[], // 过滤后的学生列表
      newList: {} as Score, // 用于存储新增学生信息的表单数据
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
    add(Data: Score) {
      // 为新学生分配自增id
      Data.id = (this.nextId++).toString();
      // 将新学生信息添加到列表
      this.filteredList.push(Data);
      // 清空新增学生信息的表单数据
      this.newList = {} as Score;
    },
    // 根据条件查询学生信息
    search(searchConditions: any) {
      return this.List.filter((Score) => {
        return (
          (!searchConditions.cname || Score.cname === searchConditions.cname) &&
          (!searchConditions.sname || Score.sname.includes(searchConditions.sname)) &&
          (!searchConditions.score || Score.score === searchConditions.score)
        );
      });
    },
    // 删除单个学生信息
    delete(Id: string) {
      const index = this.filteredList.findIndex((Score) => Score.id === Id);
      if (index !== -1) {
        this.filteredList.splice(index, 1);
      }
      this.List = this.filteredList
    },
    // 批量删除学生信息
    deletes(Ids: string[]) {
      this.filteredList = this.filteredList.filter(Score => !Ids.includes(Score.id));
      this.List = this.filteredList
    },
    // 更新学生信息
    updateData(data: Score) {
      const index = this.filteredList.findIndex((Score) => Score.id === data.id);
      if (index !== -1) {
        this.filteredList[index] = { ...data };
      }
    }
  }
})
export default storeScore