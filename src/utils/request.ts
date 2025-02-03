import axios,{type AxiosRequestConfig} from "axios";

import { setLocalStorage,getLocalStorage } from "./localstorage";
import { BASE_URL,TIMEOUT,SOURCE_URL } from "../config";

import { ElMessage } from 'element-plus'

const instance=axios.create({
  baseURL:BASE_URL,
  timeout:TIMEOUT,
  headers:{
    Accept:"application/json",
    "Content-Type":"application/json"
  }
})

instance.interceptors.request.use(
  (config)=>{
    config.headers.AcceptLanguage = getLocalStorage("locale")
    if(localStorage.myToken){
      config.headers.Authorization=getLocalStorage("myToken")
    }
    return config
  },
  (err)=>{
    return Promise.reject(err)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response)=> {
    return handleData(response.data)
  },
  (error)=>{
    const errData=error.response.data;
    if(errData.status===500){
      setLocalStorage("myToken")
      window.location.href=SOURCE_URL
    }
    let err = errData.message
    if(err !=""&&err!=null&&err!=undefined){
      ElMessage({
        type:"error",
        message:errData.message
      })
      return Promise.reject(errData)
    }else{
      ElMessage({
        type:"error",
        message:"HTTP:服务器遇到错误，请求失败！"
      })
    }
  }
  )
//封装API

//API封装
const get=async (url:string)=>{
  try {
    return await instance.get(url);
  }catch(error){
    return handleError(error)
  }
}

const post = async(
  url:string,
  data?:any,
  config?:AxiosRequestConfig<any> | undefined
)=>{
  try{
    return await instance.post(url,data,config)
  }catch(error){
    return handleError(error)
  }
}
const deleteFn=async(
  url:string,
  config?:AxiosRequestConfig<any> | undefined
)=>{
  try {
    return await instance.delete(url,config)
  }catch(error){
    return handleError(error)
  }
}
const postJSON = async(
  url:string,
  data?:any,
  config?:AxiosRequestConfig<any>|undefined
)=>{
  data=JSON.stringify(data)
  try {
    return await instance.post(url,data.config)
  }catch(error){
    return handleError(error)
  }
}
const patchFn = async(
  url:string,
  data?:any,
  config?:AxiosRequestConfig<any>|undefined
)=>{
  try {
    return await instance.patch(url,data.config)
  }catch(error){
    return handleError(error)
  }
}

function handleError(error:any){
  return error
}

function handleData(data:any){
  return data
}

export default{
  get,
  post,
  postJSON,
  delete:deleteFn,
  patch:patchFn
}