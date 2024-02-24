<script setup>
const props = defineProps({
  copIndex: {
    type: String,
    required: true,
  }
})

const copImage = `/img/cop${props.copIndex}.png`;

const {
  getSelectedChoiceForCop,
} = useCapture()

const choice = getSelectedChoiceForCop(props.copIndex)
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
      <RoundedImage :src="copImage" type="cop" :copIndex="copIndex"/>
    </div>
    <div class="flex-1 py-3 px-1 md:px-4">
      <div class="w-full">
        <RoundedImage :src="cityImage" type="city" :copIndex="copIndex"/>
      </div>

    </div>
    <div class="flex-1 py-3 px-1 md:px-4">
      <div class="w-full">
        <RoundedImage :src="vehicleImage" type="vehicle" :copIndex="copIndex"/>
      </div>

    </div>
  </div>

</template>