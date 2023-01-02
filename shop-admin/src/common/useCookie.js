
import { useCookies } from '@vueuse/integrations/useCookies'
const TINKENKEY = 'token'

const cookie = useCookies()
//设置token
const setToken = (token)=>{
 return cookie.set(TINKENKEY,token)
}

//获取token
const getToken = ()=>{
    return cookie.get(TINKENKEY)
}

//删除token
const removeToken = ()=>{
    return cookie.remove(TINKENKEY)
}

export {
    setToken,
    getToken,
    removeToken
}