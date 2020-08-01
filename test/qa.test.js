const { QA } = require(`../lib/qa`)

test(`instantiates QA and confirms that there's an ID`, () => {
    const test = new QA()
    expect(test.getProperty(`employeeId`)).toEqual(expect.anything())
})

test(`confirms that getProperty(position) returns 'qa'`, () => {
    const test = new QA()
    expect(test.getProperty(`position`)).toEqual(`qa`)
})

test(`validates that getProperty(email) sets value`, () => {
    const test = new QA()
    test.setProperty(`email`,`issac@issac.me`)
    expect(test.getProperty(`email`)).toEqual(`issac@issac.me`)
})

test(`validates that setProperty(name) sets value`, () => {
    const test = new QA()
    test.setProperty(`name`,`carlos issac`)
    expect(test.getProperty(`name`)).toEqual(`carlos issac`)
})

test(`confirms that getProperty('projectcode') returns expected value`, () => {
    const test = new QA()
    test.setProperty(`phase`,`perf`)
    expect(test.getProperty(`phase`)).toEqual(`perf`)
})