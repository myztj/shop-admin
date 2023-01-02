//创建vuex引入创建方法
import { createStore } from 'vuex'

//创建store实例
const store = createStore({
    //保存信息
    state:{
       token:''
    },
    //类似计算属性有缓存
    getters:{

    },
    //类似methods方法 同步 commit 调用
    mutations:{

    },
    //异步方法 dispatch 调用
    actions:{

    },
    //vuex模块化
    modules:{

    }
})

export default store