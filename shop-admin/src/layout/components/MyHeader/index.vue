<template>
    <div class="headerBox cursor-pointer flex items-center justify-between h-full">
        <div class="flex items-center">
            <div class="icon-left">
                <el-icon class="no-inherit icon">
                    <ElemeFilled />
                </el-icon>
                <span>积云商城</span>
            </div>
            <div>
                <el-icon class=" icon-btn" @click="menuIsShow">
                    <Fold v-if="isOpenMone" />
                    <Expand v-else />
                </el-icon>
                <el-tooltip effect="dark" content="刷新" placement="bottom">
                    <el-icon @click="$router.go(0)" class="icon-btn">
                        <Refresh />
                    </el-icon>
                </el-tooltip>
            </div>
        </div>
        <div class="flex items-center">
            <el-tooltip effect="dark" :content="isFullscreen?'全屏':'退出全屏'" placement="bottom">
                <el-icon class="mr-5 icon-btn" @click="fullScreen">
                    <FullScreen v-if="isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>
            <div class="flex items-center">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link flex items-center text-light-50">
                        <el-avatar :size="25" class="mr-2" :src="userInfo.avatar" />
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
    <ZDrawer ref="refDrawer" :conifrmText="loading?'提交中...':'提交'" @onSubmit="onSubmit" @cancel="cancel" title="修改密码"
        destroyOnClose :loading="loading">
        <el-form :model="form" ref="reference" :rules="rules" size="small">
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
    </ZDrawer>
</template>

<script setup>
    import ZDrawer from '@/components/ZDrawer.vue'
    //全屏组件，详细请自行百度
    import screenfull from "screenfull"
    import { computed, ref, reactive } from 'vue'
    import { useStore } from "vuex"
    import {toast} from '@/common/promptComponent'
    import { useRouter } from "vue-router";
    import { ElMessageBox } from 'element-plus'
    //引入退出登录和修改密码，参数和逻辑方法（封装在common/useMyheader.js中方便后期维护）
    import {useRepassword} from "./useMyheader"
    //调用此方法
    const {form,rules,reference,onSubmit,openDrawer,refDrawer,closeDrawer,logout,cancel,loading} = useRepassword()
    // const reload = ()=>{location.reload()}//此方法也可以实现页面刷新，需要定义方法，如果只是一个刷新推荐在页面使用$router.go(0)
    const store = useStore()
    const router = useRouter()
    //drawer抽屉是否展开
    let isDrawerShow = ref(false)
    const isOpenMone = computed(() => store.getters.isOpenMone)
    //修改aside打开状态
    const menuIsShow = () => {
        store.commit('app/SETOPNMENU')
    }
    //是否全屏
    let isFullscreen = ref(true)
    //获取用户信息
    const userInfo = computed(() => store.state.userInfo)
    //下拉菜单事件
    const handleCommand = (e) => {
        if (e == 'changePassword') {
            console.log('修改密码');
            // isDrawerShow.value = true
            openDrawer()
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
    //切换全屏
    const fullScreen = () => {
        // screenfull.isEnabled  判断浏览器是否支持全屏
        if (screenfull.isEnabled) {
            //全屏和退出全屏切换
            screenfull.toggle()
        }
        //screenfull.isFullscreen 判断是否全屏，全屏是true不是全屏false
        isFullscreen.value = screenfull.isFullscreen
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

    .icon-btn {
        width: 42px;
        height: 64px;
    }

    .icon-btn:hover {
        @apply bg-indigo-600;
    }
</style>