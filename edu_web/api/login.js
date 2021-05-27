import request from "@/utils/request"
export default {
  loginUser(loginVo){ //用户登录 返回token
    return request({
      url:'/ucenter/login/',
      method:'post',
      data:loginVo
    })
  },
  getMemberInfo(){ //根据token获取用户信息
    return request({
      url:'/ucenter/getMemberInfo',
      method:'get',
    })
  },
  //根据用户id获取用户信息 个人中心用
  getUserInfo(id){
    return request({
      url:'/ucenter/getUserInfo/'+id,
      method:'post',
    })
  },
//修改用户信息
  updateUser(user){
    return request({
      url:'/ucenter/updateUser/',
      method:'post',
      data: user
    })
  },
  //修改用户密码
  ChangePassword(formItem){
    return request({
      url: `/ucenter/change`,
      method: 'post',
      data: formItem
    })
  }
}
