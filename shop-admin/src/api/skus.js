import request from '@/utils/requrst'

//商品规格列表
const getSkusListApi = (page)=>{
    return request({
        url:`skus/${page}`,
        method:'GET'
    })
}

//增加商品规格
const createSkusApi = (data)=>{
    return request({
        url:'/skus',
        method:'POST',
        data
    })
}

//修改商品规格
const updateSkusApi = (id,data)=>{
    return request({
        url:`/skus/${id}`,
        method:'POST',
        data
    })
}

//修改商品规格状态
const updateSkusStatisApi = (id,data)=>{
    return request({
        url:`/skus/${id}/update_status`,
        method:'POST',
        data
    })
}

//批量删除商品规格
const deleteAllSkus = (ids)=>{
    console.log(ids);
    ids = !Array.isArray(ids)?[ ids ] : ids
    return request({
        url:'/skus/delete_all',
        method:'POST',
        data:{
            ids
        }
    })
}

export default{
    getSkusListApi,
    createSkusApi,
    updateSkusApi,
    updateSkusStatisApi,
    deleteAllSkus
}
