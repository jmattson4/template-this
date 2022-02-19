<template>
    <div class="field">
        <label class="label">{{props.label}}</label>
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Text input" :value="value" @input="onInput"/>
            <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
            </span>
        </div>
        <p class="help is-success"></p>
    </div>
</template>

<script setup lang="ts">
import { useTemplateStore } from '@/stores/template'
const props = defineProps({
  label: String,
  value: String
})
const store = useTemplateStore()

const onInput = (input: Event) => {
  const target = input.target as HTMLInputElement
  store.updateFieldValue(props.label ?? '', target.value)
}
</script>
