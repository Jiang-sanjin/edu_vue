import axios from 'axios'
import cookie from 'js-cookie'
import { Message } from "element-ui"; //引入下载的插件
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9000', // api的base_url
  timeout: 20000 // 请求超时时间
})
//http request 拦截器
service.interceptors.request.use( //在每次请求中使用拦截器
  config => {
    //判断cookie中是否有token
    if (cookie.get('edu_token')) {
      //coolie中有token 那么把token放入header中
      config.headers['token'] = cookie.get('edu_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)
// http response 拦截器
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 284) {
      console.log("response.data.resultCode是28004")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //debugger
      window.location.href = "/login"
      return
    } else {
      if (response.data.code !== 200) {
        //250：订单支付中，不做任何提示
        if (response.data.code != 250) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
       
        return response.data;
       
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  });
export default service
