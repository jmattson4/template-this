import type { Field } from '@/models/Field'


export function parseInput(input: string): Field[] {
    let fields: Field[] = []

    let lastLeftBracket = 0
    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case '{':
                lastLeftBracket = i
                break;
            case '}':
                let name = input.slice(lastLeftBracket + 1, i) 
                name = name ? name : `${fields.length + 1}`
                fields.push({name: name, value: ''})
                break;
            default:
                break;
        }
    }


    return fields
}


export function parseToOutput(input: string, fields: Field[]): string {
    let i = 0
    return input.replace(/{}/g, function () {
      return fields[i] ? fields[i++].value : '';
    });
}