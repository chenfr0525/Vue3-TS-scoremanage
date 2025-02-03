import request from "../utils/request";

const getScores=()=>{
  return request.get("/mock/score.json")
}

export default getScores