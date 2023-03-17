import request from '@/utils/requrst'

//用户列表
const getUserListApi = (page,data)=>{
    return request({
        url:`/user/${page}`,
        method:'GET',
        data
    })
}

//增加用户
const addUserApi = (data)=>{
    return request({
        url:'/user',
        method:'POST',
        data
    })
}

//修改用户
const amendUserApi = (id,data)=>{
    return request({
        url:`/user/${id}`,
        method:'POST',
        data
    })
}

//删除用户
const removeUserApi = (id)=>{
    return request({
        url:`/user/${id}/delete`,
        method:'POST',
    })
}

//修改用户状态
const amendUserStatusApi = (id,data)=>{
    return request({
        url:`/user/${id}/update_status`,
        method:'POST',
        data
    })
}

export default {
    getUserListApi,
    addUserApi,
    amendUserApi,
    removeUserApi,
    amendUserStatusApi
}


