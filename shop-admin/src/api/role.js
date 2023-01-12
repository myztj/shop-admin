import request from '@/utils/requrst'

//角色列表
const getRoleListApi = (page)=>{
    return request({
        url:`/role/${page}`,
        method:'GET',
    })
}

//增加角色

const createRoleApi = (data)=>{
    return request({
        url:'/role',
        method:'POST',
        data
    })
}

//修改角色
const updateRoleApi = (id,data)=>{
    return request({
        url:`/role/${id}`,
        method:'POST',
        data
    })
}

//删除角色
const deleteRoleApi = (id)=>{
    return request({
        url:`/role/${id}/delete`,
        method:'POST'
    })
}
//修改角色状态
const updateRoleStatusApi = (id,data)=>{
    return request({
        url:`/role/${id}/update_status`,
        method:'POST',
        data
    })
}

//配置角色权限
const rolePermissionApi = (data)=>{
    return request({
        url:'/role/set_rules',
        method:'POST',
        data
    })
}

export default{
    getRoleListApi,
    createRoleApi,
    updateRoleApi,
    deleteRoleApi,
    updateRoleStatusApi,
    rolePermissionApi
}