<template>
  <div class="container">
    <div class="top-margin">
      <div class="columns">
        <div class="column">
          <div v-for="val in store.fields">
            <DisplayField :label="val.name" :value="val.value"></DisplayField>
          </div>
        </div>
        <div class="column is-three-quarters">
          <textarea class="textarea" placeholder="I want to {} template {} this" @input="onInput"></textarea>
          <textarea v-if="store.output" class="textarea" placeholder="Output" >{{store.output}}</textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateStore } from '@/stores/template'
import DisplayField from './components/display_field.vue'
const store = useTemplateStore()

const onInput = (input: Event) => {
  const target = input.target as HTMLTextAreaElement
  store.update('input', target.value)
}
</script>

<style>
.top-margin {
  margin-top: 20vh;
}
</style>
