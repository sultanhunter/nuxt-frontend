<script setup lang="ts">
const imageUrl1 = '/img/cop0.png';
const imageUrl2 = '/img/cop1.png';
const imageUrl3 = '/img/cop2.png';


const {isLoading, fetchCityVehicleData} = useCapture()

onMounted(() => {
  fetchCityVehicleData();
});


</script>

<template>
  <div v-if="!isLoading" class="h-screen flex flex-col">
    <div class="relative flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl1})` }">
      <div class="backdrop-blur h-full w-full">
        <LandingPageSection copIndex="0"/>
      </div>
    </div>
    <div class="flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl2})` }">
      <div class="backdrop-blur h-full w-full">
        <LandingPageSection copIndex="1"/>
      </div>
    </div>
    <div class="flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl3})` }">
      <div class="backdrop-blur h-full w-full">
        <LandingPageSection copIndex="2"/>
      </div>
    </div>
  </div>
  <div v-else class="h-screen flex items-center justify-center">
    Loading...
  </div>
</template>


