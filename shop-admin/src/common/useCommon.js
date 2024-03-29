import { reactive, ref, computed } from "vue";
import { toast } from '@/common/promptComponent'
//表格，分页，搜索,删除，修改状态,批量刪除
export function useInitTable(options = {}) {
  //优化搜索表单在不同情况和不同参数的问题
  //批量刪除需要的ID數組
  const ids = ref([])
  const multipleTableRef = ref(null)
  let searchForm = null;
  let resetSearchForm = null;
  if (options.searchForm) {
    searchForm = reactive({ ...options.searchForm });
    resetSearchForm = () => {
      for (const key in options.searchForm) {
        // console.log(options.searchForm[key]);
        searchForm[key] = options.searchForm[key];
      }
      getTableData();
    };
  }
  //搜索
  const search = () => {
    getTableData();
  };
  const page = ref(1);
  const total = ref(0);
  const tableData = ref([]);
  const limit = ref(10);
  const getTableData = async (p) => {
    if (typeof p == "number") page.value = p;
    try {
      let res = await options.getListApi(page.value, {
        limit: limit.value,
        ...searchForm,
      });
      console.log(res);
      //如果有些数据需要在外面处理，可以会用回调的方式来处理，
      if (options.getListSuccess && typeof options.getListSuccess == "function") {
         //利用回调把成功的数据传出去！
        options.getListSuccess(res);
      } else {
        //不传回调就默认只赋值total和列表数据
        total.value = res.totalCount;
        // tableData.value = res.list;
         tableData.value = res.list 
      }
    } catch (error) {
      console.log(error);
    }
  };
      //修改管理员状态
      const amendAdminStatus = async (status,row) => {
         row.statusLoading = true
             
        try {
            let res = await options.updateStatusApi(row.id, { status })
            console.log(res);
            toast('状态修改成功')
            getTableData()
              row.statusLoading = false
        } catch (error) {
            console.log(error);
             row.statusLoading = false
            getTableData()
        }
    }
    //删除
    const handelDelete = async (row) => {
        try {
            let res = await options.deleteApi(row.id)
            toast('删除成功')
            getTableData()
        } catch (error) {
            console.log(error);
        }
    }
  getTableData()
  //表格多選按鈕狀態發生變化
  const handleSelectionChange = (val)=>{
    ids.value = val.map(o=>o.id)
 }

 //批量删除 
 const handelDelete_all = async()=>{
    if(ids.value.length==0) {
       return toast('請選者要刪除的列表','error')
    }
    console.log(ids.value);
      try {
          let res = await options.deleteApi(ids.value)
          toast('批量删除成功')
          //清除多選狂狀態
          multipleTableRef.value.clearSelection()
          getTableData()
      } catch (error) {
          console.log(error);
      }
 }

 //批量上架、下架
 const handelUpdateStatus = async(status)=>{
  if(ids.value.length==0) {
     return toast('請選者要刪除的列表','error')
  }
    try {
        let res = await options.updateStatusApi(ids.value,status)
        toast('修改状态成功')
        //清除多選狂狀態,
        multipleTableRef.value.clearSelection()
        getTableData()
    } catch (error) {
        console.log(error);
    }
}
  return {
    searchForm,
    search,
    page,
    total,
    tableData,
    limit,
    ids,
    resetSearchForm,
    getTableData,
    amendAdminStatus,
    handelDelete,
    handleSelectionChange,
    handelDelete_all,
    multipleTableRef,
    handelUpdateStatus
  };
}

//表单的 新增和修改
export function useInitForm(options){
    console.log(options);
    const loading = ref(false)
    let ruleForm = reactive({...options.form})
    const rules = reactive({
        ...options.rules
    })

    const drawerRef = ref(null)
    const editId = ref(0)
    const title = computed(() => editId.value ? '编辑' : '新增')
    options.getTableData()
    //新增
    const added = () => {
        editId.value = 0
        drawerRef.value.open()
    }
    //刷新
    const refreshList = () => {
        location. reload()
    }
    //抽屉提交
    const ruleFormRef = ref(null)
    const onSubmit = () => {
      console.log('表单的数据=>',ruleForm);
      console.log(editId.value);
        ruleFormRef.value.validate(valid => {
            if (!valid) return
            loading.value = true
            let data = {}
            if(options.disposeFormData && typeof options.disposeFormData=='function'){
              data = options.disposeFormData({...ruleForm})
            }else{
              data = ruleForm
            }
            let func = editId.value ? options.update(editId.value, data) : options.create(data)
            func.then(res=>{
                toast(title.value + '成功')
                //这里判断是添加页码就是第一页，如果是编辑就是当前页
                options.getTableData(editId.value ? false : 1)
                loading.value = false
                cancel()
            }).finally(()=>{
                loading.value = false 
            })
        })
    }
    //抽屉取消
    const cancel = () => {
        drawerRef.value.close()
    }
     //修改
     const amend = (row) => {
        console.log(row);
        editId.value = row.id
        if(row){
            for (const key in ruleForm) {
                ruleForm[key] = row[key]
            }
        }
        drawerRef.value.open()
    }
    //抽屉关闭的回调，这里清除了表单
    const handelClose = () => {
        for (const key in ruleForm) {
            ruleForm[key] = options.form[key]
        }
    }
    return {
        loading,
        ruleForm,
        rules,
        drawerRef,
        title,
        added,
        refreshList,
        ruleFormRef,
        onSubmit,
        cancel,
        amend,
        handelClose
    }
}