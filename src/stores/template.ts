import { defineStore } from 'pinia'
import type { Field } from '@/models/Field'
import { parseInput, parseToOutput } from '@/services/template_parser'

export interface Store {
    input: string,
    output: string
}

export const useTemplateStore = defineStore({
    id: 'template',
    state: () => ({
        input: "",
        output: ""
    }) as Store,
    getters: {
        fields(state): Field[] {
            return parseInput(state.input)
        },
    },
    actions: {
        update(state: keyof Store, input: string) {
            this.$state[state] = input
        },
        updateFieldValue(field:string, newValue: string) {
            let f = this.fields.find(f => f.name === field)
            if (f) {
                f.value = newValue
                this.parseOutput()
            }
        },
        parseOutput() {
            this.output = parseToOutput(this.input, this.fields)
        }
    }
})
