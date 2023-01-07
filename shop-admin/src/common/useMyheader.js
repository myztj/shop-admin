import conservator from "@/api/conservator"
import { ref, reactive } from 'vue'
import { useStore } from "vuex"
import toast from '@/common/toast'
import { useRouter } from "vue-router";
export  function useRepassword() {
    const store = useStore()
    const router = useRouter()
    //修改密码表单字段
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: '',
    })
    //表单验证规则
    const rules = reactive({
        oldpassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' },],
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' },],
        repassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' },]
    })
    //获取fom表单实例
    const reference = ref(null)
    //修改密码提交
    const onSubmit = () => {
        console.log(123);
        reference.value.validate((valid) => {
            if (valid) {
                updatepassword()
            } else {
                console.log('验证失败');
            }
        })
    }
    //修改密码提交按钮loading状态
    let loading = ref(false)
    //修改密码
    const updatepassword = async () => {
        loading.value = true
        try {
            let response = await conservator.updatepasswordApi(form)
            toast('修改密码成功，请重新登录')
            store.commit('REMOVECOOKIE')
            router.push('/login')
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false
        }
    }
    //获取抽屉实例
    const refDrawer = ref(null)
    const openDrawer = ()=>refDrawer.value.open()
    const closeDrawer = ()=>refDrawer.value.close()
        //退出登录
    const logout = async () => {
        try {
            let response = await conservator.logoutApi()
            console.log(response);
            store.commit('REMOVECOOKIE')
            toast('退出成功')
            router.push('/login')
        } catch (error) {
            console.log(error);
        }
    }
                //修改密码提交
        const cancel = () => {
            console.log('取消');
            closeDrawer()
        }
    return {
        form,
        rules,
        reference,
        refDrawer,
        onSubmit,
        openDrawer,
        closeDrawer,
        logout,
        cancel,
        loading
    }
}