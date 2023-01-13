<template>
  <el-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
   style="width: 100px;"
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
    + 添加值
  </el-button>
</template>

<script lang="ts" setup>
  //具体逻辑看element-plus 示例，大部分代码都是复制的
import { nextTick, ref } from 'vue'
const props = defineProps({
  modelValue:[String,Number]
})
const emit = defineEmits(['update:modelValue'])
const inputValue = ref('')
//渲染tag数组数据，props.modelValue是父组件v-model传过来的值，是一串字符串，需要split转为数组
const dynamicTags = ref(props.modelValue ? props.modelValue.split(',') : [])
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  //在删除的时候，也要把最新的值返回给父组件
  emit('update:modelValue',dynamicTags.value.join(','))
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
      //在键盘时间和失焦里面给父组件把值传回去，因为服务器参数要的是一串字符串，传过去之前直接转为字符串
    emit('update:modelValue',dynamicTags.value.join(','))
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>