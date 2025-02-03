import request from "../utils/request";

// const testApi=()=>{
//   return request.get("/api/test")
// }
const getStudents=()=>{
  return request.get("/mock/student.json")
}

export default getStudents