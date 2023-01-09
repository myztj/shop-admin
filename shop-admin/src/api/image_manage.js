import request from '@/utils/requrst'
//图片上传
const imageUploada = '/api/image/upload'

//删除图片
const imageDeleteApi = (data) =>{
    return request({
        url:'/image/delete_all',
        method:'POST',
        data
    })
}
//修改图片名称
const imageAmendApi = (id,data) =>{
    return request({
        url:`/image/${id}`,
        method:'POST',
        data
    })
}

export default {
    imageDeleteApi,
    imageAmendApi,
    imageUploada
}