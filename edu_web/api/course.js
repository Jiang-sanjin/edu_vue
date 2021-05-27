import request from "@/utils/request"

const course_api = "/course"

export default {
  getCourseList(page,limit,courseQuery){ //分页+条件查询课程
    return request({
      url: `${course_api}/${page}/${limit}`,
      method:'post',
      data:courseQuery,
    })
  },
  getAllSubject(){//查询所有分类
    return request({
      url:'/subject/',
      method:'get',
    })
  },
  getCourseInfo(id){//查询课程详情
    return request({
      url:'/course/WebVo/'+id,
      method:'post'
    })
  },
  createOrders(courseId){//生成订单
    return request({
      url:'/order/createOrder/'+courseId,
      method:'post'
    })
  },
  //增加游览次数
  getUdateViewCount(id){
    return request({
      url: `${course_api}/updateViewCount/${id}`,
      method:'get',
      data: id
    })
  },

  getMemberInfo(){//根据token获取用户信息
    return request({
      url:'/ucenter/getMemberInfo',
      method:'get',
    })
  },

}
