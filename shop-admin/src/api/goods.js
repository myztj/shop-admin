import request from '@/utils/requrst'

//商品列表
const getGoodsList = (page,data)=>{
    return request({
        url:`/goods/${page}`,
        method:'GET',
        data
    })
}

//增加商品
const createGoods = (data)=>{
    return request({
        url:'/goods',
        method:'POST',
        data
    })
}

//修改商品
const updateGoods = (id,data)=>{
    return request({
        url:`/goods/${id}`,
        method:'POST',
        data
    })
}

//批量上架/下架商品
const GoodsAreOnAndOff = (ids,status)=>{
    return request({
        url:`/goods/changestatus`,
        method:'POST',
        data:{
            ids,
            status
        }
    })
}

//批量删除商品
const deleteAllGoods = (ids)=>{
    return request({
        url:`/goods/delete_all`,
        method:'POST',
        data:{
            ids
        }
    })
}

//批量恢复商品
const recoverAllGoods = (data)=>{
    return request({
        url:`/goods/restore`,
        method:'POST'
    })
}

//彻底删除商品
const shiftDeleteGoods = (data)=>{
    return request({
        url:`/goods/destroy`,
        method:'POST',
        data
    })
}

//审核商品
const relevancy = (id,data)=>{
    return request({
        url:`/goods/${id}/check`,
        method:'POST',
        data
    })
}

//设置商品轮播图
const setSlideshow = (id,data)=>{
    return request({
        url:`/goods/banners/${id}`,
        method:'POST',
        data
    })
}

//查看商品资料
const checkGoodsData = (id)=>{
    return request({
        url:`/goods/read/${id}`,
        method:'GET',
    })
}

//更新商品规格
const updateGoodsSize = (id,data)=>{
    return request({
        url:`/goods/updateskus/${id}`,
        method:'POST',
        data
    })
}


//添加商品规格选项
const createGoodsSizeOption = (data)=>{
    return request({
        url:`/goods_skus_card`,
        method:'POST',
        data
    })
}

//修改商品规格选项
const updateGoodsSizeOption = (id,data)=>{
    return request({
        url:`/goods_skus_card/${id}`,
        method:'POST',
        data
    })
}

//删除商品规格选项
const deleteGoodsSizeOption = (id)=>{
    return request({
        url:`/goods_skus_card/${id}/delete`,
        method:'POST'
    })
}

//排序商品规格选项
const sortGoodsSizeOption = (data)=>{
    return request({
        url:'/goods_skus_card/sort',
        method:'POST',
        data
    })
}

//添加商品规格选项
const createGoodsSizeOptionValue = (data)=>{
    return request({
        url:'/goods_skus_card_value',
        method:'POST',
        data
    })
}

//修改商品规格选项的值
const updateGoodsSizeOptionValue = (id)=>{
    return request({
        url:`/goods_skus_card_value/${id}`,
        method:'POST',
        data
    })
}

//删除商品规格选项的值
const deleteGoodsSizeOptionValue = (id)=>{
    return request({
        url:`/goods_skus_card_value/${id}/delete`,
        method:'POST'
    })
}

//选择设置商品规格选项和值
const chooseUpdateGoodsSizeOptionValue = (id)=>{
    return request({
        url:`/goods_skus_card/${id}/set`,
        method:'POST',
        data
    })
}
export default {
    chooseUpdateGoodsSizeOptionValue,
    deleteGoodsSizeOptionValue,
    updateGoodsSizeOptionValue,
    createGoodsSizeOptionValue,
    sortGoodsSizeOption,
    deleteGoodsSizeOption,
    updateGoodsSizeOption,
    createGoodsSizeOption,
    updateGoodsSize,
    checkGoodsData,
    setSlideshow,
    relevancy,
    shiftDeleteGoods,
    recoverAllGoods,
    deleteAllGoods,
    GoodsAreOnAndOff,
    updateGoods,
    createGoods,
    getGoodsList,
}