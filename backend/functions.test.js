const{sum,subtract,multiply}=require('./functions.js');

test('adding 2+5 equals 7',()=>{
    expect(sum(2,5)).toBe(7);
})
test('subtracting 2-5 equals -3',()=>{
    expect(subtract(2,5)).toBe(-3);
})
test('multiplying 2*5 equals 10',()=>{
    expect(multiply(2,5)).toBe(10);
})