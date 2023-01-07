<template>
     {{num.n.toFixed(0)}}
</template>

<script setup>
 import {reactive} from 'vue'
 import {gsap} from 'gsap'
 const props = defineProps({
    value:{
        type:[Number,String],
        default:0
    }
 })

 const num = reactive({
    n:0
 })

 const numberRun = ()=>{
    gsap.to(num,{
        duration:1,
        n : props.value
    })
 }
 numberRun()
</script>

<style scoped>

</style>