import request from "@/utils/request"

export default {
  sendCode(email){ //根据邮箱发送验证码
    return request({
      url:'/email/send/'+email,
      method:'get'
    })
  },
  registerUser(registerVo){ //注册
    return request({
      url:'/ucenter/register/',
      method:'post',
      data:registerVo,
    })
  }
}
