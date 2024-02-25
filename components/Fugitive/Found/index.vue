<script setup>
import Lottie from "lottie-web";
import animationData from "@/public/assets/found.json"

const {result} = useCapture()

const captureCopIndex = computed(() => {
  return result().value.copIndex
})

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

const baseUrl = 'https://main--yocket-nuxt.netlify.app';

const imageUrl = computed(() => {
  return `${baseUrl}/img/cop${captureCopIndex.value}.png`
})

const copName = `Cop ${parseInt(captureCopIndex.value) + 1}`;
</script>

<template>
  <div class="h-full w-full  bg-cover bg-no-repeat"
       :style="{ 'background-image': `url(${imageUrl})` }">
    <div class="h-full w-full flex flex-col backdrop-blur items-center justify-evenly ">
      <div class="bg-black/70 w-full h-10 flex justify-center items-center">
        <p class="text-xl italic text-white">Caught</p>
      </div>
      <div class="flex md:px-20 px-5 items-center justify-center h-full w-full">
        <div class="flex-1 relative">
          <NuxtImg :src="imageUrl" class="rounded border object-cover"/>
          <div class="absolute top-0 left-0 bg-black/70 w-full rounded-t-lg flex flex-row border-x border-t p-2">
            <p class="text-white md:text-md font-bold ">{{ copName }}</p>
          </div>
        </div>
        <div ref="lottieContainer" class="flex-1">
        </div>
        <div class="flex-1">
          <NuxtImg :src="`${baseUrl}/img/criminal.png`" class="rounded-lg border object-cover"/>
        </div>
      </div>
    </div>

  </div>

</template>