<template>
    <el-form :model="model" label-width="80px" size="small">
        <el-row :gutter="20">
            <slot></slot>
            <template v-if="showSearch">
                <slot name="show"></slot>
            </template>
            <el-col :span="8" :offset="showSearch ? 0 : 8" class="!flex items-center justify-end">
                <el-button type="primary" size="small" @click="$emit('search')">搜索</el-button>
                <el-button size="small" class="ml-2" @click="$emit('resetSearchForm')">重置</el-button>
                <el-button size="small" text @click="showSearch=!showSearch" v-if="slotShow">
                    {{showSearch?'收起':'展开'}}
                    <el-icon>
                        <ArrowDownBold v-if="!showSearch" />
                        <ArrowUpBold v-if="showSearch" />
                    </el-icon>
                </el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup>
  import {ref,useSlots} from 'vue'
  const showSearch = ref(false)
  defineProps({
    model:Object
  })
  defineEmits(['search','resetSearchForm'])
  const slots = useSlots()
  const slotShow = ref(!!slots.show)
</script>

<style scoped>

</style>