import request from '@/utils/requrst'

//订单列表
const getOrderList = (page,data)=>{
    return request({
        url:`/order/${page}`,
        method:'GET',
        data
    })
}

//批量删除订单
const orderDelete_all = (data)=>{
    return request({
        url:'/order/delete_all',
        method:'POST',
        data
    })
}

//订单发货
const orderShip = (id,data)=>{
    return request({
        url:`/order/${id}/ship`,
        method:'POST',
        data
    })
}
  
//拒绝/同意退款

const orderHandleRefund = (id,data)=>{
    return request({
        url:`/order/${id}/handle_refund`,
        method:'POST',
        data
    })
}

//导出订单
const orderExcelexpor = (data)=>{
    return request({
        url:`/order/excelexport`,
        method:'POST',
        data
    })
}

//快递公司列表
const expressCompany = ()=>{
    return request({
        url:'/express_company/1',
        method:'GET'
    })
}

//订单物流信息
const orderGetShipInfo = (id)=>{
    return request({
        url:`/order/${id}/get_ship_info`,
        method:'GET'
    })
}
export default{
    getOrderList,
    orderDelete_all,
    orderShip,
    orderHandleRefund,
    expressCompany,
    orderGetShipInfo
}