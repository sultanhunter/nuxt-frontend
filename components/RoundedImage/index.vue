<script setup>

defineProps({
  src:{
    type:String,
    required:true,
  }
})
</script>


<template>
  <div>
    <NuxtImg class="rounded-lg h-[30vh] object-cover border" :src='src' />
  </div>
</template>