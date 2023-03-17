import request from '@/utils/requrst'

//会员等级列表
const getUserLevelListApi = (page)=>{
    return request({
        url:`/user_level/${page}`,
        method:'GET',
    })
}

//增加会员等级
const createUserLevelApi = (data)=>{
    return request({
        url:'/user_level',
        method:'POST',
        data
    })
}

//修改会员等级
const updateUserLevelApi = (id,data)=>{
    return request({
        url:`/user_level/${id}`,
        method:'POST',
        data
    })
}

//删除会员等级
const deleteUserLevelApi = (id)=>{
    return request({
        url:`/user_level/${id}/delete`,
        method:'POST'
    })
}
//修改会员等级状态
const updateUserLevelStatusApi = (id,data)=>{
    return request({
        url:`/user_level/${id}/update_status`,
        method:'POST',
        data
    })
}


export default{
    getUserLevelListApi,
    createUserLevelApi,
    updateUserLevelApi,
    deleteUserLevelApi,
    updateUserLevelStatusApi,
}