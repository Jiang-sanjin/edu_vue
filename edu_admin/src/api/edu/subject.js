import request from '@/utils/request'

const subject_api = '/subject'

export default {

    getNestedTreeList() {
        return request({
            url: `${subject_api}/tree`,
            method: "get"
        })
    },
    removeById(id) {
        return request({
            url: `${subject_api}/${id}`,
            method: "delete"
        })
    },
    saveLevelOne(subject) {
        return request({
            url: `${subject_api}/saveLevelOne`,
            method: "post",
            data: subject
        })
    },
    saveLevelTwo(subject) {
        return request({
            url: `${subject_api}/saveLevelTwo`,
            method: "post",
            data: subject
        })
    }

}