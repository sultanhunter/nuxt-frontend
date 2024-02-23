<script setup>

const {setIsOpen, selectedOption} = useModal()

</script>

<template>
  <div @click="setIsOpen(false)"
       class=" h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-black/50 p-16">
    <div @click.stop="setIsOpen(true)" class="text-center bg-white h-full w-full">
      <h2>Select {{ selectedOption().value.type }} for {{ selectedOption().value.copIndex }} cop</h2>
      <button>Okay</button>
    </div>
  </div>
</template>