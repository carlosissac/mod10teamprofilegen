const { TechLead } = require(`../libraries/techlead`)

test(`instantiates TechLead and confirms that there's an ID`, () => {
    const test = new TechLead(`Firmware`)
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`confirms that getProperty(position) returns 'techlead'`, () => {
    const test = new TechLead(`Firmware`)
    expect(test.getProperty(`position`)).toEqual(`techlead`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new TechLead(`Firmware`)
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new TechLead(`Firmware`)
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`confirms that getProperty returns 'carlosissac'`, () => {
    const test = new TechLead(`Firmware`)
    expect(test.getProperty(`area`)).toEqual(`Firmware`)
})