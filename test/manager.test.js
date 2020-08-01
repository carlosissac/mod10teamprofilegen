const { Manager } = require(`../lib/manager`)

test(`instantiates Manager and confirms that there's an ID`, () => {
    const test = new Manager()
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`confirms that getProperty(position) returns 'manager'`, () => {
    const test = new Manager()
    expect(test.getProperty(`position`)).toEqual(`manager`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new Manager()
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new Manager()
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`confirms that getProperty('organization') returns 'SW Engineering'`, () => {
    const test = new Manager()
    test.setProperty(`organization`,`SW Engineering`)
    expect(test.getProperty(`organization`)).toEqual(`SW Engineering`)
})