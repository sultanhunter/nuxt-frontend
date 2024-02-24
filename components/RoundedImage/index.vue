<script setup>

const props = defineProps({
  copIndex: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
})

const {setIsOpen, setSelectedOption} = useModal()

const onClick = () => {

  if (props.type === 'cop') {
    return
  }

  setIsOpen(true);
  setSelectedOption({
    copIndex: props.copIndex,
    type: props.type
  })
}

</script>


<template>
  <div @click="onClick()">
    <div class="flex flex-col items-center justify-center rounded-lg h-[30vh] bg-amber-50/45  border"
         v-if="src.length===0 ">
      <p>Select {{ type }}</p>
      <Icon class="h-8 w-8" name="ep:plus"/>
    </div>
    <NuxtImg class="rounded-lg h-[30vh] w-full  border object-cover" v-else :src='src'/>


  </div>
</template>