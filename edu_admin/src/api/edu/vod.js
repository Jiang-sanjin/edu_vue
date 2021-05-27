import request from '@/utils/request'

const vod_api = '/vod'

export default {

  removeById(id) {
    return request({
      url: `${vod_api}/${id}`,
      method: 'delete'
    })
  }
}
