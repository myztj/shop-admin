import { ElNotification , ElMessage, ElMessageBox } from "element-plus";

export const toast = (message, type = "success") => {
  ElNotification({
    dangerouslyUseHTMLString:true,
    message,
    type,
    duration: 2000,
  });
};
//
export const msgBox = (title,value)=>{
  return  ElMessageBox.prompt(title, ' ', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    message:title,
    inputValue:value,
  })
}

