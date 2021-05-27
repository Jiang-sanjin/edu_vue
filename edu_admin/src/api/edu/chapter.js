import request from '@/utils/request'

const chapter_api = '/chapter'

export default {

    getChapterAndVideoById(id){
        return request({
            url:`${chapter_api}/${id}`,
            method:'get'
        })
    },
    save(chapter){
        return request({
            url:`${chapter_api}/save`,
            method:'post',
            data:chapter
        })  
    },
    getChapterById(id){
        return request({
            url:`${chapter_api}/get/${id}`,
            method:'get'
        })
    },
    updateById(chapter){
        return request({
            url:`${chapter_api}/update`,
            method:'put',
            data:chapter
        }) 
    },
    removeById(id){
        return request({
            url:`${chapter_api}/${id}`,
            method:'delete'
        })
    }
}