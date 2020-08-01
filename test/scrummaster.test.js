const { ScrumMaster } = require(`../lib/scrummaster`)

test(`instantiates ScrumMaster and confirms that there's an ID`, () => {
    const test = new ScrumMaster()
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})


test(`confirms that getProperty(position) returns 'scrummaster'`, () => {
    const test = new ScrumMaster()
    expect(test.getProperty(`position`)).toEqual(`scrummaster`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new ScrumMaster()
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new ScrumMaster()
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`confirms that getProperty('projectcode') returns expected value`, () => {
    const test = new ScrumMaster()
    test.setProperty(`projectcode`,`01234567890`)
    expect(test.getProperty(`projectcode`)).toEqual(`01234567890`)
})