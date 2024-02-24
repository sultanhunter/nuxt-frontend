<script setup lang="ts">

const {setIsOpen, selectedOption} = useModal()

const {
  cityVehicleData,
  updateSelectedVehicle,
  updateSelectedCity,
  cityAvailable,
  vehicleAvailable,
  getSelectedChoice
} = useCapture()

const cities = computed(() => {
  return cityVehicleData().value.cities
})

const vehicles = computed(() => {
  return cityVehicleData().value.vehicles
})

const type = computed(() => {
  return selectedOption().value.type
})

const selectedId = ref('')

const onOutsideClick = () => {
  setIsOpen(false)
  selectedId.value = ''
}

const selectedCityId = computed(() => {
  const copIndex = selectedOption().value.copIndex

  const selectedChoice = getSelectedChoice(copIndex)

  return selectedChoice?.cityId ?? ''
})

const onSelect = (id: string) => {

  if (type.value === 'city' && !cityAvailable(id)) {
    return
  } else if (type.value === 'vehicle') {

    const cityId = selectedCityId.value
    
    const available = vehicleAvailable(cityId, id)

    if (!cityId || !available) {
      return
    }
  }

  selectedId.value = id
}

const onConfirm = () => {
  if (selectedId.value.length < 1) {
    return
  }
  if (type.value === 'vehicle') {
    updateSelectedVehicle(selectedOption().value.copIndex, selectedId.value)
    onOutsideClick()

  } else if (type.value === 'city') {
    updateSelectedCity(selectedOption().value.copIndex, selectedId.value)
    onOutsideClick()

  }
}

</script>

<template>
  <div @click="onOutsideClick()"
       class=" h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50 p-16">
    <div @click.stop="setIsOpen(true)"
         class="bg-amber-50 rounded-lg h-full w-full p-4 grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4">
      <div v-if="type==='city'" v-for="city in cities">
        <div @click.stop="onSelect(city.id)" class="w-full h-full relative">
          <NuxtImg :src="`/img/${city.id}.png`" class="object-cover w-full h-full rounded-lg"/>
          <div
              class="absolute overflow-hidden rounded-t-lg top-0 left-0 right-0 bottom-0 h-[40px] w-full flex items-center justify-between text-white bg-black/70 px-2">
            <p class="text-md font-bold truncate">{{ city.name }}</p>
            <p class="text-sm italic">{{ city.distance }} km</p>
          </div>
          <div v-if="!cityAvailable(city.id)"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-red-400/60 text-white font-bold">
            Not Available
          </div>
          <div v-if="selectedId===city.id"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-amber-800/60 text-white font-bold">
            Selected
          </div>
        </div>
      </div>
      <div v-else v-for="vehicle in vehicles">
        <div @click.stop="onSelect(vehicle.id)" class="h-full w-full relative">
          <NuxtImg :src="`/img/${vehicle.id}.png`" class="object-cover w-full h-full rounded-lg"/>
          <div
              class="absolute overflow-hidden rounded-t-lg top-0 left-0 right-0 bottom-0 h-[40px] w-full flex items-center justify-between text-white bg-black/70 px-2">
            <p class="text-md font-bold">{{ vehicle.kind }}</p>
            <p class="text-sm italic">Range: {{ vehicle.range }} km</p>
          </div>
          <div v-if="!vehicleAvailable(selectedCityId,vehicle.id)"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-red-400/60 text-white font-bold">
            Not Available
          </div>
          <div v-if="selectedId===vehicle.id"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-amber-800/60 text-white font-bold">
            Selected
          </div>
        </div>
      </div>
      <div class="w-full flex items-center justify-center" :class="{ 'md:col-span-3': type === 'vehicle' }">
        <button @click.stop="onConfirm()" class="h-10 w-[180px] bg-amber-800 rounded-lg text-white">Confirm Selection
        </button>
      </div>
    </div>
  </div>
</template>