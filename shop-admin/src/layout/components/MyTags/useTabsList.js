import { ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { setTabs, getTabs } from "@/common/useCookie";
export  function useTabsList() {
  const router = useRouter();
  const route = useRoute();
  const activeTba = ref(route.path);
  //tabsList做兼容，获取本地cookie的数据，如果没有默认首页，（这里也可以用一个事件处理，如果有bug就换事件）
  const tbasList = ref(getTabs() || [{ title: "后台首页", path: "/" }]);
  //vue-router 提供的一个路由切换前的一个生命周期，好处是页面卸载同时也跟着卸载，（这里也可以用watch来作监听！！）
  onBeforeRouteUpdate((e) => {
    let tabsObj = {
      title: e.meta.title,
      path: e.path,
    };
    addTab(tabsObj);
  });
  //添加tabs事件
  const addTab = (targetName) => {
    activeTba.value = targetName.path;
    let isexist =
      tbasList.value.findIndex((i) => i.path == targetName.path) == -1;
    if (isexist) {
      tbasList.value.push(targetName);
      setTabs(tbasList.value);
    }
  };
  //tabs变动事件
  const handlerTabChange = (e) => {
    router.push(e);
  };
  //删除Tab事件
  const removeTab = (targetName) => {
    //获取要删除的tbs下标
    let remIndex = tbasList.value.findIndex((i) => i.path == targetName);
    //获取要当前高亮的的tbs下标
    let activeIndex = tbasList.value.findIndex(
      (i) => i.path == activeTba.value
    );
    //删除
    tbasList.value.splice(remIndex, 1);
    //判断删除的合当前的是否是一个
    if (remIndex == activeIndex) {
      handlerTabChange(tbasList.value[activeIndex - 1].path);
    }
    setTabs(tbasList.value);
  };
  //下拉菜单
  const handleCommand = (value) => {
    if (value == "closeElse") {
      tbasList.value = tbasList.value.filter(
        (item) => item.path == activeTba.value || item.path == "/"
      );
      setTabs(tbasList.value);
    } else if (value == "closeAll") {
      tbasList.value = [{ title: "后台首页", path: "/" }];
      activeTba.value = "/";
      setTabs(tbasList.value);
    }
  };
  return {
    activeTba,
    tbasList,
    handlerTabChange,
    removeTab,
    handleCommand,
  };
}
