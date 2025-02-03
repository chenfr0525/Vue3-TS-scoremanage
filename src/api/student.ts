import request from "../utils/request";

const getStudents=()=>{
  return request.get("/mock/student.json")
}

export default getStudents