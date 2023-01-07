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

//退出登录
const logoutApi = ()=>{
  return request({
    url:'/logout',
    method:'POST',
  })
}

//修改密码
const updatepasswordApi = (data)=>{
  return request({
    url:'updatepassword',
    method:'POST',
    data
  })
}

export default {
    loginApi,
    getUserInfoApi,
    logoutApi,
    updatepasswordApi
}