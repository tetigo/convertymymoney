const convert = require('./convert')

test('convert 4 to 4', ()=>{
    expect(convert.convert(4,4)).toBe(16)
})
test('espera cotacao 0', ()=>{
    expect(convert.convert(4,0)).toBe(0)
})
test('toMoney converts float', ()=>{
    expect(convert.toMoney(2)).toBe('2.0000')
})
test('toMoney converts string', ()=>{
    expect(convert.toMoney('2')).toBe('2.0000')
})

