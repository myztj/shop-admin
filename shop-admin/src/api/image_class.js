import request from '@/utils/requrst'
//获取图库分类列表
const getImageListApi = (page,limit)=>{
    return request({
        url:`/image_class/${page}?limit=${limit}`,
        method:'GET',
    })
}
//新增图库列表
const addImageListApi = (data)=>{
    return request({
        url:`/image_class`,
        method:'POST',
        data
    })
}
//修改图库列表
const editImageListApi = (id,data)=>{
    return request({
        url:`/image_class/${id}`,
        method:'POST',
        data
    })
}
//删除图库列表
const deleteImageListApi = (id)=>{
    return request({
        url:`/image_class/${id}/delete`,
        method:'POST'
    })
}
//指定分类下的图片列表
const appointImageListApi = (id,page,limit)=>{
    return request({
        url:`/image_class/${id}/image/${page}?limit=${limit}`,
        method:'GET'
    })
}

export default {
    getImageListApi,
    addImageListApi,
    editImageListApi,
    appointImageListApi,
    deleteImageListApi
}