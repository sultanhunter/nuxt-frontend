<script setup lang="ts">

const {setIsOpen, modalSelectedOption} = useModal()

const {
  cityVehicleData,
  updateSelectedVehicleForCop,
  updateSelectedCityForCop,
  cityAvailableForCop,
  vehicleAvailableForCop,
  getSelectedChoiceForCop,
  cityAlreadySelectedForCop,
  vehicleAlreadySelectedForCop,
  vehicleAvailableForCity,
} = useCapture()

const cities = computed(() => {
  return cityVehicleData().value.cities
})

const vehicles = computed(() => {
  return cityVehicleData().value.vehicles
})

const type = computed(() => {
  return modalSelectedOption().value.type
})

const copIndex = computed(() => {
  return modalSelectedOption().value.copIndex
})


const selectedId = ref('')

const onOutsideClick = () => {
  setIsOpen(false)
  selectedId.value = ''
}


const selectedCityId = computed(() => {

  const selectedChoice = getSelectedChoiceForCop(copIndex.value)

  return selectedChoice?.cityId ?? ''
})

const onSelect = (id: string) => {

  if (type.value === 'city') {

    const cityAvailable = cityAvailableForCop(copIndex.value, id)
    if (!cityAvailable) {
      return
    }
    if (selectedId.value === id) {
      selectedId.value = ''
      return
    }

  } else if (type.value === 'vehicle') {
    const vehicleAvailable = vehicleAvailableForCop(copIndex.value, id)

    if (!vehicleAvailable) {
      return
    }
    const cityId = selectedCityId.value

    const availableForCity = vehicleAvailableForCity(cityId, id)

    if (!cityId) {
      alert('Select city first')
      return
    } else if (!availableForCity) {
      alert('Vehicle range invalid for selected city. Please select a different city')
      return
    } else {
      if (selectedId.value === id) {
        selectedId.value = ''
        return
      }
    }
  }

  selectedId.value = id

}

const onConfirm = () => {
  if (type.value === 'vehicle') {
    updateSelectedVehicleForCop(copIndex.value, selectedId.value)
    onOutsideClick()

  } else if (type.value === 'city') {
    updateSelectedCityForCop(copIndex.value, selectedId.value)
    onOutsideClick()

  }
}

onMounted(() => {
  if (type.value === 'vehicle') {
    vehicles.value.forEach((vehicle) => {
      if (vehicleAlreadySelectedForCop(copIndex.value, vehicle.id)) {
        selectedId.value = vehicle.id
      }
    })
  } else {
    cities.value.forEach((city) => {
      if (cityAlreadySelectedForCop(copIndex.value, city.id)) {
        selectedId.value = city.id
      }
    })
  }
})

const baseUrl = 'https://main--yocket-nuxt.netlify.app';

</script>

<template>

  <!-- Outer most semi transparent div -->
  <div @click="onOutsideClick()"
       class=" h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50 md:p-16">

    <!-- Modal Main Div -->
    <div @click.stop="setIsOpen(true)"
         class="bg-amber-50 rounded-lg h-full w-full p-4 grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4">

      <!-- Cities List if selected type is city -->
      <div v-if="type==='city'" v-for="city in cities">
        <div @click.stop="onSelect(city.id)" class="w-full h-full relative">

          <!-- Main City Image -->
          <NuxtImg :src="`${baseUrl}/img/${city.id}.png`" class="object-cover w-full h-full rounded-lg"/>

          <!-- City Details tag -->
          <div
              class="absolute overflow-hidden rounded-t-lg top-0 left-0 right-0 bottom-0 h-[40px] w-full flex items-center justify-between text-white bg-black/70 px-2">
            <p class="text-md font-bold truncate">{{ city.name }}</p>
            <p class="text-sm italic">Trip: {{ city.distance * 2 }} km</p>
          </div>

          <!-- Not available tag -->
          <div v-if="!cityAvailableForCop(copIndex,city.id) && !(selectedId===city.id)"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-red-400/60 text-white font-bold">
            Not Available
          </div>

          <!-- Selected tag -->
          <div @click.stop="onSelect(city.id)" v-if="selectedId===city.id"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-amber-800/60 text-white font-bold">
            Selected
          </div>
        </div>
      </div>

      <!-- Vehicles list if selected type is vehicle -->
      <div v-else v-for="vehicle in vehicles">
        <div @click.stop="onSelect(vehicle.id)" class="h-full w-full relative">

          <!-- Main Vehicle Image -->
          <NuxtImg :src="`${baseUrl}/img/${vehicle.id}.png`" class="object-cover w-full h-full rounded-lg"/>

          <!-- Vehicle Details tag -->
          <div
              class="absolute overflow-hidden rounded-t-lg top-0 left-0 right-0 bottom-0 h-[40px] w-full flex items-center justify-between text-white bg-black/70 px-2">
            <p class="text-md font-bold">{{ vehicle.kind }}</p>
            <p class="text-sm italic">Range: {{ vehicle.range }} km</p>
          </div>

          <!-- Not available tag -->
          <div v-if="!vehicleAvailableForCop(copIndex,vehicle.id) && !(selectedId===vehicle.id)"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-red-400/60 text-white font-bold">
            Not Available
          </div>

          <!-- Selected tag -->
          <div @click.stop="onSelect(vehicle.id)" v-if="selectedId===vehicle.id"
               class="absolute rounded-lg top-0 left-0 bottom-0 right-0 h-full flex items-center justify-center bg-amber-800/60 text-white font-bold">
            Selected
          </div>
        </div>
      </div>

      <!-- Confirm Selection Button -->
      <div class="w-full flex flex-col items-center justify-center gap-4"
           :class="{ 'md:col-span-3': type === 'vehicle' }">
        <button @click.stop="onConfirm()" class="h-10 w-[180px] bg-amber-800 rounded-lg text-white">Confirm Selection
        </button>
        <div class="h-10 w-[100px] text-white rounded-full bg-red-400 flex items-center justify-center">
          <button @click.stop="onOutsideClick" class="italic">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>