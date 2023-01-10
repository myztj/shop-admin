import request from '@/utils/requrst'
//获取公告列表
const getNoticeListApi = (page=1)=>{
    return request({
        url:`/notice/${page}`,
        method:'GET',
    })
}

//增加公告
const addNoticeApi = (data)=>{
    return request({
        url:'/notice',
        method:'POST',
        data
    })
}

//修改公告
const amendNoticeApi = (id,data)=>{
    return request({
        url:`/notice/${id}`,
        method:'POST',
        data
    })
}
//删除公告
const removeNoticeApi = (id)=>{
    return request({
        url:`/notice/${id}/delete`,
        method:'POST'
    })
}
export default {
    getNoticeListApi,
    addNoticeApi,
    amendNoticeApi,
    removeNoticeApi
}
