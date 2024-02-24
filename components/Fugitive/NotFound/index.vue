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

const imageUrl = '/img/criminal.png'
</script>

<template>
  <div class="h-full w-full flex items-center justify-evenly bg-cover bg-no-repeat"
       :style="{ 'background-image': `url(${imageUrl})` }">
    <div class="h-full w-full flex flex-col backdrop-blur items-center justify-start">
      <div class="bg-black/70 w-full h-10 flex justify-center items-center">
        <p class="text-xl italic text-white">Escaped</p>
      </div>
      <div class="flex flex-row md:px-20 px-5 items-center justify-center h-full w-full">
        <NuxtImg :src="imageUrl" class="rounded border object-cover"/>
      </div>
    </div>

  </div>

</template>