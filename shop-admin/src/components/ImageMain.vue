<template>
    <el-main class="image-main">
        <div class="top">
            <div v-for="i in 100" :key="i">{{i}}</div>
        </div>
        <div class="bottom">456</div>
    </el-main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
 .image-main {
        position: relative;

        .top {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 50px;
            overflow: auto;
        }

        .bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 50px;
            @apply flex items-center justify-center;
        }
    }
</style>