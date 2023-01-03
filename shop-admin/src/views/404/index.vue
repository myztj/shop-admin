<template>
    <div class="nodfond">
        <el-button class="btn" type="info" round @click="$router.push('/')">点击返回首页</el-button>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .nodfond {
        width: 800px;
        height: 500px;
        background: url('/20210617140818-01.jpg') no-repeat;
        margin: 200px auto;
        position: relative;
    }

    .btn {
        position: absolute;
        top: 385px;
        right: 117px;
    }
</style>