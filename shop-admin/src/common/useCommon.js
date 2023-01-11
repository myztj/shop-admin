import anagementApi from "@/api/admin_anagement";
import { reactive, ref, computed } from "vue";
export function useInitTable(options = {}) {
//优化搜索表单在不同情况和不同参数的问题
  let searchForm = null
  let resetSearchForm = null
  if (options.searchForm) {
    searchForm=reactive({...options.searchForm})
    resetSearchForm=()=>{
        for (const key in options.searchForm) {
            searchForm[key] =options.searchForm[key]
        }
        getAnagementList();
    }
  }
  const page = ref(1);
  const total = ref(0);
  const tableData = ref([]);
  const limit = ref(10);
  const getAnagementList = async (p) => {
    if (typeof p == "number") page.value = p;
    try {
      let res = await options.getListApi(page.value, {
        limit: limit.value,
        keyword: searchForm.keyword,
      });
      if (
        options.getListSuccess &&
        typeof options.getListSuccess == "function"
      ) {
        options.getListSuccess(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    searchForm,
    page,
    total,
    tableData,
    limit,
    resetSearchForm,
    getAnagementList,
  };
}
