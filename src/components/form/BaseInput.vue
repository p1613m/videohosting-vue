<template>
  <div class="form-group mb-3">
    <label>{{ label }}</label>
    <input class="form-control" :type="type ?? 'text'"
           :class="{'is-invalid': error}"
           :placeholder="placeholder"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
    >
    <span class="invalid-feedback" v-if="error">{{ error[0] }}</span>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: [
      'label',
      'type',
      'placeholder',
      'error',
      'modelValue',
  ],
}
</script>