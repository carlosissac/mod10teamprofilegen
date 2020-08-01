const { ProductOwner } = require(`../lib/productowner`)

test(`instantiates ProductOwner and confirms that there's an ID`, () => {
    const test = new ProductOwner()
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`confirms that getProperty(position) returns 'productowner'`, () => {
    const test = new ProductOwner()
    expect(test.getProperty(`position`)).toEqual(`productowner`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new ProductOwner()
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new ProductOwner()
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`confirms that getProperty('github') returns expected value`, () => {
    const test = new ProductOwner()
    test.setProperty(`costcenter`,`01234567890`)
    expect(test.getProperty(`costcenter`)).toEqual(`01234567890`)
})