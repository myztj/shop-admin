import router from '@/router'
//顶一个动态添加路由的方法
export function dynamicAdditionAddRouter(menus){
  //声明一个变量判断是否添加了新路由，用来解决刷新404或白屏问题
  let hasNewRouter = false
  //再定一个方法此方法是用来递归路由层级的
  const processRoutingList = (arr)=>{
    //在vite3中动态添加路由不支持commonjs的语法，所以要用到import.meta.glob来引入路由路径
    const routeAllPathToCompMap =import.meta.glob(`../views/**/*.vue`);
    //遍历路由
    arr.forEach(e=>{
      //我们要的路由在子里面  所以要遍历子路由
      e.child.forEach(c=>{
        let routerPath = {
          path:c.frontpath,
          name:c.frontpath,
          meta:{
           title:c.name
          },
          component:routeAllPathToCompMap[`../views${c.frontpath}.vue`]
       }
       if (c.child && c.child.length>0) {
        //调用动态添加的方法
         processRoutingList(c.child)
       }
       //这里在添加时一定要查询是否存在该路由再添加！
       if(!router.hasRoute(c.frontpath)){
         router.addRoute('Layout',routerPath)
         //添加了状态改为true
         hasNewRouter=true
       }
      })
    })
  }
  //递归
  processRoutingList(menus)
  //抛出去
  return hasNewRouter
}