<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => ['primary', 'gradient'].includes(value),
  },
  to: String,
  isLoading: {
    default: false,
    type: Boolean,
  },
})

const bgStyles = computed(() =>
  props.variant === 'gradient' ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]' : 'bg-[#FFA270]',
)
const componentName = computed(() => (props.to ? RouterLink : 'button'))
</script>

<template>
  <component
    :is="componentName"
    :to="to"
    class="btn rounded-xl py-[14px] px-10 text-white font-bold -tracking-wider hover:bg-[#ffb58d] duration-300 ease-in-out"
    :class="bgStyles"
  >
    <template v-if="props.isLoading">Завантаження...</template>

    <template v-else> <slot></slot></template>
  </component>
</template>

// Using dynamic classes for the button to change the color of the background depending on the value
of the variant prop. Prop declared with some restrictions about it`s value - required and type.
Recommended to use with validator, to check if the value of te prop is permitted. "Computed" add
reactive changing of the styles (in this example) of the button depending on the value of the
variant prop. // Updating component to use routing (useful in the GreetingView page). Adding props
'to' for marking button as a routing link and adding variable 'componentName' where checking if the
button is a link. If prop 'to' is present, then IButton component will be rendered as RouterLink
component. //Adding isLoading prop for checking if event, called by clicking on the button, is
loading. Also adding conditional rendering of the button content - if isLoading is true -
"Завантаження...". If isLoading is false - content of the button (using templates for conditional
rendering).
