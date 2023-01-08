<template>
    <div class="common-layout">
        <el-container class="bg-light-50" :style="`height: ${calculateHeight}px`">
          <el-header class="iamge-header">Header</el-header>
          <el-container>
            <el-aside width="220px" class="image-aside">
                <div class="top">
                    <div v-for="i in 100" :key="i">{{i}}</div>
                </div>
                <div class="bottom">456</div>
            </el-aside>
            <el-main class="image-main">
                <div class="top">
                    <div v-for="i in 100" :key="i">{{i}}</div>
                </div>
                <div class="bottom">456</div>
            </el-main>
          </el-container>
        </el-container>
      </div>
</template>

<script setup>
    //获取页面的总高度如果获取不到就获取body的高度
  let windowHeight = window.innerHeight || document.body.innerHeight
  //计算高度
  let calculateHeight = windowHeight - 64 - 40 -40
</script>

<style lang="scss" scoped>
.iamge-header{
    @apply flex items-center rounded;
    border-bottom: 1px solid #eee;
}
.image-main{
    position: relative;
    .top{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom:50px;
        overflow: auto;
    }
    .bottom{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        @apply flex items-center justify-center;
    }
}
.image-aside{
    position: relative;
    .top{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom:50px;
        overflow: auto;
    }
    .bottom{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        @apply flex items-center justify-center;
    }
}
</style>