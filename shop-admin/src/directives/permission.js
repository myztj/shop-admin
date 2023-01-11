import store from "../store";
//创建一个方法来操作权限的具体逻辑
function hasPermission(el,value){
    //这里判断在使用指令是必须是数组，如果不是就throw new Error 抛出错误
       if(!Array.isArray(value)){
        throw new Error(`请输入正确的指令格式，例如v-permission="['getStatistics3,GET']"`)
       }
       //遍历，查询store.state.ruleNames中是否包含传过来的数组中的某一个
       let isper = value.findIndex(o=>store.state.ruleNames.includes(o)) !=-1
       //如果不包含就是删除元素
       if(!isper){
        el.parentNode && el.parentNode.removeChild(el)
       }
}

export default {
    //注意这里的函数名称必须是install，否者会报错拿不到App，我也不知道为啥就是踩了坑！！！！
    //声明一个install函数，在mian.js注册（use）
    install(app){
        //拿到app调用他的directive方法配置自定义指令
        app.directive('permission',{
            mounted(el,binding){
              hasPermission(el,binding.value)
            }
        })
    }
}