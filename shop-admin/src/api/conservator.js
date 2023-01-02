import request from "../utils/requrst";
//用户登录
const loginApi = (data)=>{
    return request({
      url:'/login',
      method:'POST',
      data
    })
}

//获取用户信息
const getUserInfoApi = ()=>{
  return request({
    url:'/getinfo',
    method:'POST'
  })
}


export default {
    loginApi,
    getUserInfoApi
}