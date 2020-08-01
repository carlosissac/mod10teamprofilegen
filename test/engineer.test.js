const { Engineer } = require(`../lib/engineer`)

test(`instantiates Engineer and confirms that there's an ID`, () => {
    const test = new Engineer()
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`instantiates Engineer and confirms assigns a resource name`, () => {
    const test = new Engineer()
    test.setProperty(`name`,`carlosissac`)
    expect(test.getProperty(`name`)).toEqual(`carlosissac`)
})

test(`confirms that getProperty(position) returns 'engineer'`, () => {
    const test = new Engineer()
    expect(test.getProperty(`position`)).toEqual(`engineer`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new Engineer(`carlosissac`)
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`confirms that getProperty('github') returns expected value`, () => {
    const test = new Engineer()
    test.setProperty(`github`,`carlosissac`)
    expect(test.getProperty(`github`)).toEqual(`carlosissac`)
})