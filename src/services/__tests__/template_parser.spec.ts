import { describe, it, expect } from 'vitest'
import { parseInput, parseToOutput } from '../template_parser'

describe('Template Parser', () => {
  it('test parseInput, Correct input named variables', () => {
    const testString = `{date}

      {boss_title}
      Attn: {attn}
      {location}
      
      Re: {job_title}
      
      To whom it may concern: 
      Please review my application and consider my employment over the summer months. I will be completing my second year of my Bachelor of Arts at Grant Macewan University in Edmonton, Alberta. However, I have since switched my major is Bachelor of music, with a focus in Jazz. I am applying for the Parks Summer Labourers position.  
      My skills have grown over my time with the Town of Whitecourt and I hope to return to develop those further. It is another opportunity for me to give back to the community that I was raised in. Further, I demonstrate dependability, openness to new situations, and ambition in my work ethic. I have a valid driver’s license and I am willing to work around any schedule.
      The position posted is of interest to me and I would appreciate the opportunity to discuss with you further. 
      
      
      Sincerely, 
      
      {name}`

    const fields = parseInput(testString)
    expect(fields[0].name, "Field should be date ").toBe("date")
    expect(fields[1].name, "Field should be boss_title ").toBe("boss_title")
    expect(fields[2].name, "Field should be attn ").toBe("attn")
    expect(fields[3].name, "Field should be location ").toBe("location")
    expect(fields[4].name, "Field should be job_title ").toBe("job_title")
    expect(fields[5].name, "Field should be name ").toBe("name")
  })
  it('test parseInput, Correct 2 empty brackets', () => {
    const testString = `{}

    {}
    Attn: {}
    {}
    
    Re: {}
    
    To whom it may concern: 
    Please review my application and consider my employment over the summer months. I will be completing my second year of my Bachelor of Arts at Grant Macewan University in Edmonton, Alberta. However, I have since switched my major is Bachelor of music, with a focus in Jazz. I am applying for the Parks Summer Labourers position.  
    My skills have grown over my time with the Town of Whitecourt and I hope to return to develop those further. It is another opportunity for me to give back to the community that I was raised in. Further, I demonstrate dependability, openness to new situations, and ambition in my work ethic. I have a valid driver’s license and I am willing to work around any schedule.
    The position posted is of interest to me and I would appreciate the opportunity to discuss with you further. 
    
    
    Sincerely, 
    
    {}`

    const fields = parseInput(testString)
    expect(fields[0].name, "Field should be 1 ").toBe("1")
    expect(fields[1].name, "Field should be 2 ").toBe("2")
    expect(fields[2].name, "Field should be 3 ").toBe("3")
    expect(fields[3].name, "Field should be 4 ").toBe("4")
    expect(fields[4].name, "Field should be 5 ").toBe("5")
    expect(fields[5].name, "Field should be 6 ").toBe("6")
  })
  it('test parseInput, Correct 2 empty brackets', () => {
    const testString = `{}

    {}
    Attn: {}`
    const expected = `Test 0

    Test 1
    Attn: Test 2`
    const fields = parseInput(testString)
    fields.forEach((field, index) => {
      field.value = "Test " + index
    })
    const output = parseToOutput(testString, fields)
    expect(output).toBe(expected)
  })
})
