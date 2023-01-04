<template>
    <el-sub-menu :index="item.name" v-if="item.child && item.child.length>0">
        <template #title>
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{item.name}}</span>
        </template>
        <aside-item v-for="(ele,inx) in item.child" :key="inx" :item="ele"></aside-item>
    </el-sub-menu>
    <el-menu-item :index="item.frontpath" v-else>
        <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
        <template #title>{{item.name}}</template>
    </el-menu-item>
</template>

<script setup>

    const props = defineProps({
        item: {
            type: Object,
            required: true
        }
    })

</script>

<style scoped>

</style>