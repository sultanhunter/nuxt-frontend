<script setup>
 const props =defineProps({
  index:{
    type:String,
    required:true,
  }
})

 const copImage = `/img/cop${props.index}.png`;


</script>


<template>
  
<div class="flex flex-row w-full h-full">
  <div class="flex-grow py-3 px-1 md:px-4">
    <RoundedImage :src="copImage"/>
  </div>
  <div class="flex-grow py-3 px-1 md:px-4">
    <RoundedImage :src="copImage"/>

  </div>
  <div class="flex-grow py-3 px-1 md:px-4" >
    <RoundedImage :src="copImage"/>

  </div>
</div>

</template>