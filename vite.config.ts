import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 8088,
    open: true,//启动后是否打开浏览器
    // proxy: {
    //   '/login/getVerify': {
    //     target: "http://localhost:8080/",//跨域地址
    //     changeOrigin: true,//支持跨域
    //     //rewrite:(path)=>path.replace(/^\/api/,"")//重写路径，替换/api
    //   },
    //   'api': {
    //     target: "http://localhost:8080/",//跨域地址
    //     changeOrigin: true,//支持跨域
    //     //rewrite:(path)=>path.replace(/^\/api/,"")//重写路径，替换/api
    //   }
    // }
  }
})
