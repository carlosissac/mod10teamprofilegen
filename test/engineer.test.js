const { Engineer } = require(`../libraries/engineer`)

test(`instantiates Engineer and confirms that there's an ID`, () => {
    const test = new Engineer(`carlosissac`)
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`confirms that getProperty(position) returns 'engineer'`, () => {
    const test = new Engineer(`carlosissac`)
    expect(test.getProperty(`position`)).toEqual(`engineer`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new Engineer(`carlosissac`)
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new Engineer(`carlosissac`)
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`confirms that getProperty('github') returns expected value`, () => {
    const test = new Engineer(`carlosissac`)
    expect(test.getProperty(`github`)).toEqual(`carlosissac`)
})