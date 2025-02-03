import request from "../utils/request";

const getTeachers=()=>{
  return request.get("/mock/teacher.json")
}

export default getTeachers