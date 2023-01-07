<template>
    <div>
        首页
    </div>
</template>

<script setup>
    import { useStore } from 'vuex'
    import { computed, onMounted } from 'vue'
    const store = useStore()
    const menus = computed(() => store.getters.menus)
</script>

<style scoped>

</style>