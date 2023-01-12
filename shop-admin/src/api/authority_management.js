import request from '@/utils/requrst'

//菜单权限列表
const getRuleListApi = (page=1)=>{
    return request({
        url:`/rule/${page}`,
        method:'GET'
    })
}
//增加菜单权限
const addRuleApi = (data)=>{
    return request({
        url:'/rule',
        method:'POST',
        data
    })
}
//修改菜单权限
const amendRuleApi = (id,data)=>{
    return request({
        url:`/rule/${id}`,
        method:'POST',
        data
    })
}

//删除菜单权限
const deleteRuleApi = (id)=>{
    return request({
        url:`/rule/${id}/delete`,
        method:'POST'
    })
}

//修改菜单权限状态
const amendRuleStatusApi = (id,data)=>{
    return request({
        url:`/rule/${id}/update_status`,
        method:'POST',
        data
    })
}

export default {
    getRuleListApi,
    addRuleApi,
    amendRuleApi,
    deleteRuleApi,
    amendRuleStatusApi
}