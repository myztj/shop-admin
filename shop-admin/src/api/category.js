import request from "@/utils/requrst";

//商品分类列表
const getcCategoryListApi = () => {
  return request({
    url: `/category`,
    method: "GET",
  });
};

//增加商品分类

const categoryRoleApi = (data) => {
  return request({
    url: "/category",
    method: "POST",
    data,
  });
};

//修改商品分类
const updateCategoryApi = (id, data) => {
  return request({
    url: `/category/${id}`,
    method: "POST",
    data,
  });
};

//删除商品分类
const deleteCategoryApi = (id) => {
  return request({
    url: `/category/${id}/delete`,
    method: "POST",
  });
};

//分类关联产品列表
const classRelevancyListApi = (id) => {
  return request({
    url: `/app_category_item/list?category_id=${id}`,
    method: "GET",
  });
};
//修改商品分类状态
const updateCategoryStatusApi = (id, data) => {
  return request({
    url: `/category/${id}/update_status`,
    method: "POST",
    data,
  });
};

//删除关联产品
const removeRelevancyApi = (id) => {
  return request({
    url: `/app_category_item/${id}/delete`,
    method: "POST",
  });
};

//关联产品
const RelevancyGoodsApi = (data)=>{
  return request({
    url:'/app_category_item',
    method:'POST',
    data
  })
}

export default {
  getcCategoryListApi,
  categoryRoleApi,
  updateCategoryApi,
  deleteCategoryApi,
  classRelevancyListApi,
  updateCategoryStatusApi,
  removeRelevancyApi,
  RelevancyGoodsApi
};
