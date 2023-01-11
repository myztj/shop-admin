import anagementApi from '@/api/admin_anagement'
import { reactive, ref, computed } from 'vue'
export function useInitTable(options={}){
    const searchForm = reactive({
        keyword: ''
    })
    const page = ref(1)
    const total = ref(0)
    const tableData = ref([])
    const limit = ref(10)
            //重置
            const reset = () => {
                searchForm.keyword = ''
                getAnagementList()
            }
    const getAnagementList = async (p) => {
        if (typeof p == 'number') page.value = p
        try {
            let res = await options.getListApi(page.value, { limit: limit.value, keyword: searchForm.keyword })
            if (options.getListSuccess && typeof options.getListSuccess == 'function') {
                options.getListSuccess(res)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return {
        searchForm,
        page,
        total,
        tableData,
        limit,
        reset,
        getAnagementList
    }
}