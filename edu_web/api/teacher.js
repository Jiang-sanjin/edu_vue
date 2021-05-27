import request from "@/utils/request"

const teacher_api = "/teacher"

export default {
  getTeacherList(page,limit,searchObj){ //分页 讲师查询
    return request({
      url: `${teacher_api}/${page}/${limit}`,
      method: "post",
      data: searchObj
    })
  },
  getTeacherInfo(id){//讲师详情的方法
    return request({
      url:`${teacher_api}/${id}`,
      method:"get"
    })
  },
 
}
