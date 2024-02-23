<script setup>
const props = defineProps({
  index: {
    type: String,
    required: true,
  }
})

const copImage = `/img/cop${props.index}.png`;

const {
  updateSelectedCity,
  updateSelectedVehicle,
  getSelectedChoice,
} = useCapture()

const choice = getSelectedChoice(props.index)
const cityImage = computed(() => {
  const selectedCityId = choice.value.cityId;
  if (!selectedCityId) {
    return ''
  }
  return `img/${selectedCityId}.png`
})

</script>


<template>

  <div class="flex flex-row w-full h-full justify-between">
    <div class="flex-1 py-3 px-1 md:px-4">
      <RoundedImage :src="copImage" type="cop" :copIndex="index"/>
    </div>
    <div class="flex-1 py-3 px-1 md:px-4">
      <div class="w-full">
        <RoundedImage :src="cityImage" type="city" :copIndex="index"/>
      </div>

    </div>
    <div class="flex-1 py-3 px-1 md:px-4">
      <div class="w-full">
        <RoundedImage :src="cityImage" type="vehicle" :copIndex="index"/>
      </div>

    </div>
  </div>

</template>