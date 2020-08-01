const { Employee } = require(`../lib/employee`)

test(`instantiates Employee and confirms that there's an ID`, () => {
    const test = new Employee()
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`confirms that getProperty(employee) returns employee`, () => {
    const test = new Employee()
    expect(test.getProperty(`position`)).toEqual(`employee`)
})

test(`validates that setProperty(email) sets value`, () => {
    const test = new Employee()
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new Employee()
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`validates that setProperty(email) sets value`, () => {
    const test = new Employee()
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})