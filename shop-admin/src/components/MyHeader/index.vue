<template>
    <div class="flex items-center justify-between h-full">
        <div class="flex items-center">
            <div class="icon-left">
                <el-icon class="no-inherit icon">
                    <ElemeFilled />
                </el-icon>
                <span>积云商城</span>
            </div>
            <div>
                <el-icon class="mx-5" @click="menuIsShow">
                    <Fold v-if="isOpenMone" />
                    <Expand v-else />
                </el-icon>
                <el-icon @click="$router.go(0)">
                    <Refresh />
                </el-icon>
            </div>
        </div>
        <div class="flex items-center">
            <el-icon class="mr-5" @click="fullScreen">
                <FullScreen v-if="isFullscreen" />
                <Aim v-else />
            </el-icon>
            <div class="flex items-center">
                <el-avatar :size="25" class="mx-2" :src="userInfo.avatar" />
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link text-light-50">
                        {{userInfo.username}}<el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                            <el-dropdown-item command="out">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <el-drawer class="drawer" v-model="isDrawerShow" title="修改密码" direction="rtl" size="50%">
        <div class="demo-drawer__content">
            <el-form :model="form" ref="reference" :rules="rules">
                <el-form-item label="旧密码" label-width="80px" prop="oldpassword">
                    <el-input v-model="form.oldpassword" autocomplete="off" placeholder="请输入旧密码" />
                </el-form-item>
                <el-form-item label="新密码" label-width="80px" prop="password">
                    <el-input type="password" show-password v-model="form.password" autocomplete="off"
                        placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认密码" label-width="80px" prop="repassword">
                    <el-input type="password" show-password v-model="form.repassword" placeholder="请输入确认密码"
                        autocomplete="off" />
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取消</el-button>
                <el-button type="primary" :loading="loading" @click="onSubmit">{{
                    loading ? '提交中 ...' : '提交'
                    }}</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
    import screenfull from "screenfull"
    import conservator from "@/api/conservator"
    import { computed, ref, reactive } from 'vue'
    import { useStore } from "vuex"
    import toast from '@/common/toast'
    import { useRouter } from "vue-router";
    import { ElMessageBox } from 'element-plus'
    // let emit = defineEmits(["menuIsShow"]);//使用defineEmits语法糖的方法来创建自定义事件。
    const store = useStore()
    const router = useRouter()
    //修改密码提交按钮loading状态
    let loading = ref(false)
    const isOpenMone = computed(() => store.getters.isOpenMone)
    //修改aside打开状态
    const menuIsShow = () => {
        store.commit('app/SETOPNMENU')
    }
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
    //drawer抽屉是否展开
    const isDrawerShow = ref(false)
    //是否全屏
    let isFullscreen = ref(true)
    //获取用户信息
    const userInfo = computed(() => store.state.userInfo)
    //下拉菜单事件
    const handleCommand = (e) => {
        if (e == 'changePassword') {
            console.log('修改密码');
            isDrawerShow.value = true
        } else if (e == 'out') {
            ElMessageBox.confirm('你确定要退出吗?')
                .then(() => {
                    logout()
                })
                .catch(() => {
                    // catch error
                })
        }
    }
    //修改密码提交
    const cancelForm = () => {
        console.log('取消');
    }
    //获取fom表单实例
    const reference = ref(null)
    //修改密码提交
    const onSubmit = () => {
        reference.value.validate((valid) => {
            if (valid) {
                updatepassword()
            } else {
                console.log('验证失败');
            }
        })
    }
    //切换全屏
    const fullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
        }
        //跟随全屏方法的状态
        isFullscreen.value = screenfull.isFullscreen
    }
    //修改密码
    const updatepassword = async () => {
        loading.value = true
        try {
            let response = await conservator.updatepasswordApi(form)
            console.log(response);
        } catch (error) {
            toast(error.response.data.msg, 'error')
        } finally {
            loading.value = false
        }
    }
    //退出登录
    const logout = async () => {
        try {
            let response = await conservator.logoutApi()
            console.log(response);
            store.commit('REMOVECOOKIE')
            router.push('/login')
            toast('退出成功')
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style scoped>
    .icon-left {
        @apply w-[250px] flex items-center justify-center text-gray-200 text-xl;
    }

    .icon {
        @apply mx-2;
    }

    .drawer {
        position: relative;
    }

    .demo-drawer__footer {
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
</style>