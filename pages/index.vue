<script setup>

const {openState} = useModal()

const isOpen = computed(() => {
  return openState().value;
})

</script>


<template>
  <LandingPage/>
  <Modal v-show="isOpen"/>
</template>
