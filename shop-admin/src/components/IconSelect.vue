<template>
        <div class="flex items-center">
            <el-icon :size="30" v-if="modelValue">
                <component :is="modelValue"></component>
              </el-icon>
            <el-select filterable :model-value="modelValue" placeholder="请选择图标" @change="handelIcon">
                <el-option v-for="i in newIconList" :key="i" :label="i" :value="i">
                    <div class="flex items-center justify-between">
                        <el-icon :size="20">
                          <component :is="i"></component>
                        </el-icon>
                        <span class="text-gray-500 text-xs">{{i}}</span>
                    </div>
                </el-option>
              </el-select>
        </div>
</template>

<script setup>
    import {ref} from 'vue'
    import * as iconList from '@element-plus/icons-vue'
const props = defineProps({
    modelValue:String
})
const newIconList = ref(Object.keys(iconList))
const emit = defineEmits(['update:modelValue'])
const handelIcon = (e)=>{
    emit('update:modelValue',e)
}
</script>

<style scoped>

</style>