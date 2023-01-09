<template>
    <el-upload class="w-[400px]" 
    drag 
    :data="data" 
    :action="imageMag.imageUploada" 
    :headers="{
        token
    }" 
    name="img" 
    :on-success="uploadSuccess" 
    :on-error="uploadError" 
    multiple>

        <el-icon class="el-icon--upload">
            <upload-filled />
        </el-icon>
        <div class="el-upload__text">
            将文件拖到此处，或 <em>点击上传</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
            </div>
        </template>
    </el-upload>
</template>

<script setup>
    import { toast } from '@/common/promptComponent'
    import { getToken } from '@/common/useCookie'
    import imageMag from '@/api/image_manage'
    //父组件传来上传图片的Id
    const props = defineProps({
        data: {
            type: Object
        }
    })
    //获取token在组建data里配置
    const token = getToken()
    //像父组件提交一个方法
    const emit = defineEmits(['uploadSuccess'])
    //上传成功的钩子
    const uploadSuccess = (response, uploadFile, uploadFiles) => {
        console.log(response);
        if (response.msg == 'ok') {
            emit('uploadSuccess', response, uploadFile, uploadFiles)
            toast('上传图片成功')
        }
    }

    //上传失败的钩子
    const uploadError = (error, uploadFile, uploadFiles) => {
        // console.log(error.message);
        let msg = JSON.parse(error.message).msg
        toast(msg, 'error')
    }
</script>

<style scoped>

</style>