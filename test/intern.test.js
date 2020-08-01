const { Intern } = require(`../lib/intern`)

test(`instantiates Intern and confirms that there's an ID`, () => {
    const test = new Intern()
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`confirms that getProperty(position) returns 'intern'`, () => {
    const test = new Intern()
    expect(test.getProperty(`position`)).toEqual(`intern`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new Intern()
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new Intern()
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`confirms that getProperty('school') returns expected value`, () => {
    const test = new Intern()
    test.setProperty(`school`,`CETYS Universidad`)
    expect(test.getProperty(`school`)).toEqual(`CETYS Universidad`)
})