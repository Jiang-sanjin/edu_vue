import request from "@/utils/request"
export default {
  createOrders(courseId){//生成订单
    return request({
      url:'/order/createOrder/'+courseId,
      method:'post'
    })
  },
  getOrdersInfo(id){//根据订单号 查询订单信息
    return request({
      url:'/order/getOrderInfo/'+id,
      method:'get'
    })
  },
  toAlipay(payVo){
    return request({
      url:'/pay/toalipay/',
      method:'post',
      data:payVo
    })
  },
  isBuyCourse(courseId){
    return request({
      url:'/order/isBuyCourse/'+courseId,
      method:'get',
      
    })
  },
  getUserCourse(page,limit){
    return request({
      url:`/order/getUserCourse/${page}/${limit}`,
      method:'post',
      
    })
  }
}
