import request from '@/utils/request'

const course_api = '/course'

export default {

    // 保存课程
    saveVo(courseInfo) {
        // console.log(courseInfo)
        return request({
            url: `${course_api}/saveVo`,
            method: "post",
            data: courseInfo
        })
    },
    getCourseInfoById(id) {
        return request({
            url: `${course_api}/${id}`,
            method: "get"
        })
    },
    updateVo(courseInfo) {
        return request({
            url: `${course_api}/updateVo`,
            method: "put",
            data: courseInfo
        })
    },
    getPageList(page, limit, searchObj) {
        return request({
            url: `${course_api}/${page}/${limit}`,
            method: "post",
            data: searchObj
        })
    },
    removeById(id) {
        return request({
            url: `${course_api}/${id}`,
            method: "delete"
        })
    },
    getCoursePublishVoById(id){
        return request({
            url:`${course_api}/vo/${id}`,
            method:"get"
        })
   },
   updateStatusById(id){
        return request({
            url:`${course_api}/updateStatusById/${id}`,
            method:"get"
        })
   } 
}