import request from '@/utils/requrst'

const getImageListApi = (page,limit)=>{
    return request({
        url:`/image_class/${page}?limit=${limit}`,
        method:'GET',
    })
}


export default {
    getImageListApi
}