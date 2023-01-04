<script setup>

</script>

<template>
  <!-- 整个项目的坑（占位） -->
  <router-view></router-view>
</template>

<style>
  html,
  body,
  #app {
    height: 100%;
  }
  /* 自定义加载条样式 */
  #nprogress .bar{
  background-color: #f4f4f4!important;
  height: 3px!important;
}
</style>