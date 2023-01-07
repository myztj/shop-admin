import router from '@/router'
export function dynamicAdditionAddRouter(menus){
  const processRoutingList = (arr)=>{
    const routeAllPathToCompMap =import.meta.glob(`../views/**/*.vue`);
    arr.forEach(e=>{
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
        processRoutingList(c.child)
       }
        router.addRoute('Layout',routerPath)
      })
    })
  }
  processRoutingList(menus)
}