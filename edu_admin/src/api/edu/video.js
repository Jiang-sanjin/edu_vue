import request from '@/utils/request'

const video_api = '/video'

export default {

    saveVideo(video){
        return request({
            url:`${video_api}/save`,
            method:'post',
            data:video
        })  
    },
    getVideoById(id){
        return request({
            url:`${video_api}/${id}`,
            method:'get'
        }) 
    },
    updateById(video){
        return request({
            url:`${video_api}/update`,
            method:'put',
            data:video
        }) 
    },
    removeVideoById(video_id){
        return request({
            url:`${video_api}/${video_id}`,
            method:'delete'
        }) 
    }
}