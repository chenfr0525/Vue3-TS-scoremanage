import request from "../utils/request";

const getCourse=()=>{
  return request.get("/mock/course.json")
}

export default getCourse