import request from '@/utils/requrst'

//管理员列表
const getManagerListApi = (page,data)=>{
    return request({
        url:`/manager/${page}`,
        method:'GET',
        data
    })
}

//增加管理员
const addAanagerApi = (data)=>{
    return request({
        url:'/manager',
        method:'POST',
        data
    })
}

//修改管理员
const amendManagerApi = (id,data)=>{
    return request({
        url:`/manager/${id}/update_status`,
        method:'POST',
        data
    })
}

//删除管理员
const removeManagerApi = (id)=>{
    return request({
        url:`/manager/${id}/delete`,
        method:'POST',
    })
}

//修改管理员状态
const amendManagerStatusApi = (id,data)=>{
    return request({
        url:`/manager/${id}/update_status`,
        method:'POST',
        data
    })
}

export default {
    getManagerListApi,
    addAanagerApi,
    amendManagerApi,
    removeManagerApi,
    amendManagerStatusApi
}


