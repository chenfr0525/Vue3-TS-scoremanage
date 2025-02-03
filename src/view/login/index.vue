<template>
  <div class="login-box">
    <el-form :rules="rules" ref="ruleFormRef" style="max-width: 600px" :model="loginUser" label-width="120px"
      class="login-form">
      <h2 class="login-tilte">简易成绩管理系统登录页面</h2>

      <el-form-item label="类型" prop="type">
        <el-select v-model="loginUser.userType" class="m-2" placeholder="请选择类型" size="large">
          <el-option v-for="item in userTypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="loginUser.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="loginUser.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-col>
      </el-form-item>

    </el-form>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
//vue原型上的request
const constInstance = getCurrentInstance()
const { $request } = constInstance?.appContext.config.globalProperties

//userType
interface UserType {
  value: string,
  label: string
}

const userTypes = ref<UserType[]>([
  {
    value: "Student",
    label: "学生"
  },
  {
    value: "Teacher",
    label: "教师"
  },
  {
    value: "User",
    label: "管理员"
  },
])

//loginUser
interface LoginUser {
  userType: UserType,
  username: string,
  password: string
}

const ruleFormRef = ref<FormInstance>()

const loginUser = ref<LoginUser>({
  userType: {
    value: "User",
    label: "管理员"
  },
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度应当在3-20之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 20, message: '长度应当在3-20之间', trigger: 'blur' }
  ]
})

//去路由对象
const router = useRouter()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      const postData = loginUser.value
      const peopleType = postData.userType.value || postData.userType

      if (peopleType === "User") {
        $request.get("/mock/user.json").then((rs: any) => {
          const people = rs.data.filter((item: any) => {
            return item.name === postData.username
          })
          if(!people[0]){
            ElMessage({
              message: "用户名不存在",
              type: 'error',
            })
          }else if (people[0].password === postData.password) {
            // console.log(people[0].name);
            localStorage.setItem('userInfo',people[0].name)
            ElMessage({
              message: rs.msg,
              type: 'success',
            })
            //跳转到主页面
            router.push({ path: '/home' })
          } else {
            ElMessage({
              message: "密码错误",
              type: 'error',
            })
          }
        })

      } else if (peopleType === "Student") {
        $request.get("/mock/student.json").then((rs: any) => {
          const people = rs.data.filter((item: any) => {
            return item.sno === postData.username
          })
          if(!people[0]){
            ElMessage({
              message: "用户名不存在",
              type: 'error',
            })
          }else if (people[0].password === postData.password) {
            // console.log(people[0].sname);
            localStorage.setItem('userInfo',people[0].sname)
            ElMessage({
              message: rs.msg,
              type: 'success',
            })
            //跳转到主页面
            router.push({ path: '/home' })
          } else {
            ElMessage({
              message: "密码错误",
              type: 'error',
            })
          }
        })

      } else if (peopleType === "Teacher") {
        $request.get("/mock/teacher.json").then((rs: any) => {
          const people = rs.data.filter((item: any) => {
            return item.tno === postData.username
          })
          if(!people[0]){
            ElMessage({
              message: "用户名不存在",
              type: 'error',
            })
          }else if (people[0].password === postData.password) {
            localStorage.setItem('userInfo',people[0].tname)
            ElMessage({
              message: rs.msg,
              type: 'success',
            })
            //跳转到主页面
            router.push({ path: '/home' })
          } else {
            ElMessage({
              message: "密码错误",
              type: 'error',
            })
          }
        })
      }else{
        console.log('error submit!', fields);
      }
      //跳转到主页面
      // router.push({path:'/home'})
      //验证码
      // $request.post("/api/login/validateUser",{
      //   "username":postData.username,
      //   "password":postData.password,
      //   "userType":postData.userType.value,
      //   "verify":postData.valCode
      // },{
      //   headers:{'content-type':"application/x-www-form-urlencoded"}
      // }).then((result:any)=>{
      //   if(result.code>0){
      //     ElMessage({
      //       message:result.msg,
      //       type:'success',
      //     })
      //     //跳转到主页面
      //     router.push({path:'/home'})
      //   }else{
      //     ElMessage({
      //       message:result.msg,
      //       type:'error',
      //     })
      //   }
      // })
      //验证码结束
    } else {
      console.log('error submit!', fields);
    }
  })
}

// //获取验证码图象的url
// const validCodeUrl = ref<string>("/login/getVerify")

// //获取验证码
// const changeVerify = () => {
//   validCodeUrl.value = "/login/getVerify?" + Math.random();
// }

</script>

<style scoped>
.login-form {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  height: 300px;
  border-radius: 20px;
  position: absolute;
  margin-top: -150px;
  margin-left: -250px;
  top: 50%;
  left: 50%;

  box-shadow: 2px 2px 5px #333333;
}

.login-box {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ccc;
}

.login-title {
  color: #333;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>