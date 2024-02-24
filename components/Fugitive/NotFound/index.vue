<script setup>
import Lottie from "lottie-web";
import animationData from "@/public/assets/escaped.json"

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
  <div ref="lottieContainer"></div>

</template>