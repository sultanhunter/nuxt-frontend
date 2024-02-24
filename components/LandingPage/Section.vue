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
  cityVehicleData,
} = useCapture()

const choice = getSelectedChoiceForCop(props.copIndex)
const cityImage = computed(() => {
  const selectedCityId = choice.cityId;
  if (!selectedCityId) {
    return ''
  }
  return `img/${selectedCityId}.png`
})

const cityName = computed(() => {
  const cityId = choice.cityId

  const city = cityVehicleData().value.cities.find((city) => city.id === cityId)

  return city.name
})

const cityDistance = computed(() => {
  const cityId = choice.cityId

  const city = cityVehicleData().value.cities.find((city) => city.id === cityId)

  return city.distance
})

const vehicleImage = computed(() => {
  const selectedVehicleId = choice.vehicleId;
  if (!selectedVehicleId) {
    return ''
  }
  return `img/${selectedVehicleId}.png`
})

const vehicleName = computed(() => {
  const selectedVehicleId = choice.vehicleId

  const vehicle = cityVehicleData().value.vehicles.find((vehicle) => vehicle.id === selectedVehicleId)

  return vehicle.kind

})

const vehicleRange = computed(() => {
  const selectedVehicleId = choice.vehicleId

  const vehicle = cityVehicleData().value.vehicles.find((vehicle) => vehicle.id === selectedVehicleId)

  return vehicle.range

})

</script>


<template>

  <div class="flex flex-row w-full h-full justify-between">
    <div class="flex-1 py-3 px-1 md:px-6">
      <RoundedImage :src="copImage" type="cop" :copIndex="copIndex"/>
    </div>
    <div class="flex-1 py-3 px-1 md:px-6">
      <div class="w-full ">
        <div class="relative">
          <RoundedImage :src="cityImage" type="city" :copIndex="copIndex"/>
          <div v-if="cityImage.length>1"
               class="absolute top-0 left-0 bg-black/70 w-full rounded-t-lg flex flex-row justify-between border-x border-t p-2">
            <p class="text-white text-md font-bold">{{ cityName }}</p>
            <p class="text-white text-sm italic">Trip: {{ cityDistance * 2 }} km</p>
          </div>
        </div>

      </div>

    </div>
    <div class="flex-1 py-3 px-1 md:px-6">
      <div class="w-full">
        <div class="relative">
          <RoundedImage :src="vehicleImage" type="vehicle" :copIndex="copIndex"/>
          <div v-if="vehicleImage.length>1"
               class="absolute top-0 left-0 bg-black/70 w-full rounded-t-lg flex flex-row justify-between border-x border-t p-2">
            <p class="text-white text-md font-bold">{{ vehicleName }}</p>
            <p class="text-white text-sm italic">Range: {{ vehicleRange }} km</p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>