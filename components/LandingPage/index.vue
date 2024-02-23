<script setup lang="ts">
const imageUrl1 = '/img/cop0.png';
const imageUrl2 = '/img/cop1.png';
const imageUrl3 = '/img/cop2.png';

</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="relative flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl1})` }">
      <div class="backdrop-blur h-full w-full">
        <LandingPageSection index="0"/>
      </div>
    </div>
    <div class="flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl2})` }">
      <div class="backdrop-blur h-full w-full">
        <LandingPageSection index="1"/>
      </div>
    </div>
    <div class="flex-grow bg-cover bg-no-repeat " :style="{ 'background-image': `url(${imageUrl3})` }">
      <div class="backdrop-blur h-full w-full">
        <LandingPageSection index="2"/>
      </div>
    </div>
  </div>
</template>


