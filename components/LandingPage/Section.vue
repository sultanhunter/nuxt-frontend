<script setup>
const props = defineProps({
  index: {
    type: String,
    required: true,
  }
})

const copImage = `/img/cop${props.index}.png`;

const {
  getSelectedChoice,
} = useCapture()

const choice = getSelectedChoice(props.index)
const cityImage = computed(() => {
  const selectedCityId = choice.cityId;
  if (!selectedCityId) {
    return ''
  }
  return `img/${selectedCityId}.png`
})

const vehicleImage = computed(() => {
  const selectedVehicleId = choice.vehicleId;
  if (!selectedVehicleId) {
    return ''
  }
  return `img/${selectedVehicleId}.png`
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
        <RoundedImage :src="vehicleImage" type="vehicle" :copIndex="index"/>
      </div>

    </div>
  </div>

</template>