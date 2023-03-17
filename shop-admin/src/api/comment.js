import request from '@/utils/requrst'

//商品评价列表
const getAppraiseListApi = (page,data)=>{
    return request({
        url:`/goods_comment/${page}`,
        method:'GET',
        data
    })
}

//回复商品评价
const replyAppraiseApi = (id,data)=>{
    return request({
        url:`/goods_comment/review/${id}`,
        method:'POST',
        data:{
            data
        }
    })
}

//修改管理员状态
const amendAppraiseStatusApi = (id,data)=>{
    return request({
        url:`/goods_comment/${id}/update_status`,
        method:'POST',
        data
    })
}

export default {
    getAppraiseListApi,
    replyAppraiseApi,
    amendAppraiseStatusApi
}


