<template>
    <el-row class="min-h-screen">
        <el-col :lg="16" :md="12" class="left">
            <div class="m-4">
                <div class="text-light-50 font-bold text-5xl mb-6">欢迎光临</div>
                <div class="text-gray-200 text-sm">此站点是《Vue3实战商城后台管理系统开发》视频课程的演示地址，<span
                        class="font-bold text-light-50">点击立即学习</span></div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <div class="font-bold text-3xl">欢迎回来</div>
            <div class="my-6 flex items-center">
                <span class="h-[1px] w-16 bg-gray-300"></span>
                <span class="text-gray-300 mx-2">账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-300"></span>
            </div>
            <el-form ref="ruleFormRef" class="w-[250px]" :model="ruleForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" :prefix-icon="User" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" type="password" show-password :prefix-icon="Lock"
                        placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" style="width: 250px;" round color="#626aef" type="primary"
                        @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
    import { User, Lock } from '@element-plus/icons-vue'
    import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from "vue-router";
    const store = useStore()
    const router = useRouter()
    const ruleForm = reactive({
        username: 'admin',
        password: 'admin'
    })
    let loading = ref(false)
    const rules = reactive({
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })
    const ruleFormRef = ref(null)
    const submitForm = () => {
        ruleFormRef.value.validate(async (valid) => {
            if (valid) {
                loading.value = true
                try {
                    let res = await store.dispatch('login', ruleForm)
                    if (res.token) router.push('/')
                    loading.value = false
                } catch (error) {
                    loading.value = false
                }
            } else {
                console.log('error submit!')
            }
        })
    }

    const onKeyUp = (e) => {
        if (e.key == 'Enter') {
            submitForm()
        }
    }
    onMounted(() => {
        document.addEventListener('keyup', onKeyUp)
    })
    onBeforeUnmount(() => {
        document.removeEventListener('keyup', onKeyUp)
    })
</script>

<style scoped>
    .left {
        @apply bg-indigo-500 flex items-center justify-center;
    }

    .right {
        @apply bg-light-50 flex items-center justify-center flex-col;
    }
</style>