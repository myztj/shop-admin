import request from '@/utils/requrst'

//优惠券列表
const getCouponList = (page=1)=>{
    return request({
        url:`/coupon/${page}`,
        mnethod:'GET'
    })
}

//增加优惠券
const createCoupon = (data)=>{
    return request({
        url:'/coupon',
        method:'POST',
        data
    })
}

//修改优惠券
const updateCoupon = (id,data)=>{
    return request({
        url:`/coupon/${id}`,
        method:'POST',
        data
    })
}

//删除优惠券
const deleteCoupon = (id)=>{
   return request({
    url:`/coupon/${id}/delete`,
    method:'POST'
   })
}

//失效优惠券
const failureCoupon = (id,data)=>{
    return request({
        url:`/coupon/${id}/update_status`,
        method:'POST',
        data
    })
}

export default {
    getCouponList,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    failureCoupon
}