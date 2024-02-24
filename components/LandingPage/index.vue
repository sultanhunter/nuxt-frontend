<script setup lang="ts">
const baseUrl = 'https://main--yocket-nuxt.netlify.app'

const imageUrl1 = `${baseUrl}/img/cop0.png`;
const imageUrl2 = `${baseUrl}/img/cop1.png`;
const imageUrl3 = `${baseUrl}/img/cop2.png`;


const {isFetchingData, isSubmittingData, fetchCityVehicleData, startHunting, result} = useCapture()

onMounted(() => {
  fetchCityVehicleData();
});

const fugitiveFound = computed(() => {
  return result().value && result().value?.success
})

const fugitiveNotFound = computed(() => {
  return result().value && !result().value?.success
})


</script>

<template>
  <div class="h-screen flex flex-col">

    <div v-if="isFetchingData" class="h-full w-full flex items-center justify-center">
      <Loading/>
    </div>

    <div v-else-if="isSubmittingData" class="h-full w-full flex items-center justify-center">
      <Hunting/>
    </div>

    <div v-else-if="fugitiveFound" class="h-full w-full flex items-center justify-center">
      <FugitiveFound/>
    </div>

    <div v-else-if="fugitiveNotFound" class="h-full w-full flex items-center justify-center">
      <FugitiveNotFound/>
    </div>


    <div v-else class="h-full w-full relative">

      <!-- Main content div -->
      <div class="h-full w-full flex flex-col">
        <div class="flex-grow bg-cover bg-no-repeat  " :style="{ 'background-image': `url(${imageUrl1})` }">
          <div class="backdrop-blur bg-amber-100/70 h-full w-full border-b">
            <LandingPageSection copIndex="0"/>
          </div>
        </div>
        <div class="flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl2})` }">
          <div class="backdrop-blur bg-amber-500/60 h-full w-full border-b">
            <LandingPageSection copIndex="1"/>
          </div>
        </div>
        <div class="flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl3})` }">
          <div class="backdrop-blur bg-amber-800/70 h-full w-full border-b">
            <LandingPageSection copIndex="2"/>
          </div>
        </div>
      </div>

      <!-- Start button -->
      <div @click.stop="startHunting()"
           class="absolute md:bottom-[8vh] bottom-[2vh] md:right-[28vw] right-[20vw] min-w-[80px] min-h-[80px] w-[10vw] h-[10vw] rounded-full bg-amber-950 overflow-hidden flex items-center justify-center drop-shadow-lg">
        <button class="md:text-xl text-md text-white font-bold italic">Start</button>
      </div>
    </div>


  </div>

</template>


