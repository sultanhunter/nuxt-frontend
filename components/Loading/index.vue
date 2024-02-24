<script setup>
import Lottie from "lottie-web";
import animationData from "@/public/assets/loading.json"

const lottieContainer = ref(null);

onMounted(() => {
  Lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: animationData,
  })
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center p-20">
    <div ref="lottieContainer" class="max-h-[200px] max-w-[200px]"></div>
  </div>

</template>