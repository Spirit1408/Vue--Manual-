<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    default: 'text',
    type: String,
    validator: (value) => ['text', 'email', 'password', 'textarea'].includes(value),
  },
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['update:modelValue'])

const isTextarea = computed(() => props.type === 'textarea')

const baseStyles =
  'w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary'

const inputStyles = computed(() => (isTextarea.value ? baseStyles + ' resize-none' : baseStyles))

const componentName = computed(() => (isTextarea.value ? 'textarea' : 'input'))
</script>

<template>
  <div class="w-full text-[#2C2C2C]">
    <label class="block">
      <span class="block text-xs px-3 mb-2">{{ props.label }}</span>

      <component
        :is="componentName"
        rows="3"
        :class="inputStyles"
        v-bind="{ ...$props, ...$attrs }"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      >
      </component>
    </label>
  </div>
</template>

// Further improvement of the input component. Instead of using "v-if, v-else" we can use one, but
with a tag "component". It will put a proper tag name depending on the value of the prop "type" - if
textarea, it will be "textarea", if not, it will be "input". Attribute ":is" is a reference to the
computed tag name, which should be rendered, according to the value of the prop "type". In this way
we create a multifunctional dynamic component.
