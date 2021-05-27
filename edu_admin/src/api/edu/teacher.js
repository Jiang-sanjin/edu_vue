import request from '@/utils/request'

const teacher_api = "/teacher"


export default {
  //获取全部教师数据
  getList() {
    return request({
      url: "/teacher/list",
      method: 'get'
    })
  },
  // 获取教师数据列表
  getPageList(page,limit,searchObj){
    return request({
      url: `${teacher_api}/${page}/${limit}`,
      method: "post",
      data: searchObj
    })
  },
  //根据id删除
  removeById(id){
    return request({
      url: `${teacher_api}/${id}`,
      method: "delete"
    })
  },
  // 保存
  save(teacher){
    return request({
      url: `${teacher_api}/save`,
      method: "post",
      data: teacher
    })
  },
  // 根据id查询
  selectById(id){
    return request({
      url:`${teacher_api}/${id}`,
      method:"get"
    })

  },
  // 根据id更新老师
  updateById(teacher){
      return request({
        url:`${teacher_api}/update`,
        method:"put",
        data:teacher
      })
  },
  //获取所有的教师职称
  getTeacherLevel(){
    return request({
      url: '/teacher-level/',
      method: "get",
    })
  },
  // 添加职称
  addLevel(Level){
    console.log(Level)
    return request({
      url: '/teacher-level/add',
      method: "post",
      data:Level
    })
  },
  //更新职称
  updateLevel(Level){
    return request({
      url: '/teacher-level/update',
      method: "put",
      data:Level
    })
  },
  // 删除职称
  deleteLevel(id){
    return request({
      url: `/teacher-level/delete/${id}`,
      method: "delete",
    })
  }
}
