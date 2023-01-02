import { ElNotification } from 'element-plus'

const toast = (message,type='success')=>{
    ElNotification({
        message,
        type,
      })
}

export default toast