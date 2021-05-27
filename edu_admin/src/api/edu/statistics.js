import request from '@/utils/request'

const statistics_api = '/statistics'

export default {
    //生成统计数据
    createDataSta(day) {
        return request({
            url:`${statistics_api}/createData/${day}`,
            method: 'post'
        })
    },
    //获取数据进行图表显示
    showDataEcharts(searchObj) {
        return request({
            url:`${statistics_api}/getCountData/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
        })
    }
}
