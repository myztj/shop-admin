import request from '../utils/requrst'

const gteStatisticsApi1 = ()=>{
    return request({
        url:'/statistics1',
        method:'GET'
    })
}

const gteStatisticsApi2 = ()=>{
    return request({
        url:'/statistics2',
        method:'GET'
    })
}

const gteStatisticsApi3 = (data)=>{
    return request({
        url:'/statistics3',
        method:'GET',
        data
    })
}

export default {
    gteStatisticsApi1,
    gteStatisticsApi2,
    gteStatisticsApi3
}