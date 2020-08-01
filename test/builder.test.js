const { Builder } = require(`../helper/builder`)
const path = require('path')

test(`ClearContent of an existing file`, async () => {
    const test = new Builder()
    test.templatesDir = path.resolve(__dirname,`../templates`)
    test.outputPath = path.resolve(__dirname,`../output`)
    test.outputPath += `/team_jest.html`
    
    const log = jest.spyOn(global.console, `log`)
    await test.clearContent()
    expect(log).toHaveBeenLastCalledWith('Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html')
})

test(`clearing and appending StartRow content to an existing file`, async () => {
    const test = new Builder()
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_jest.html`
    test.templatesDir = path.resolve(__dirname,`../templates`)
    test.outputPath = path.resolve(__dirname,`../output`)
    test.outputPath += `/team_jest.html`

    await expect(test.fileClear(fp)).resolves.toBe(`Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html`)
    
    const log = jest.spyOn(global.console, `log`)
    await test.appendStartRow()
    expect(log).toHaveBeenLastCalledWith('Appended sqRow')
})

test(`clearing and appending EndDiv content to an existing file`, async () => {
    const test = new Builder()
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_jest.html`
    test.templatesDir = path.resolve(__dirname,`../templates`)
    test.outputPath = path.resolve(__dirname,`../output`)
    test.outputPath += `/team_jest.html`
    test.counter = 2

    await expect(test.fileClear(fp)).resolves.toBe(`Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html`)
    
    const log = jest.spyOn(global.console, `log`)
    await test.appendEndDiv()
    expect(log).toHaveBeenLastCalledWith('Appended endDiv')
})

test(`clearing and appending Main1 content to an existing file`, async () => {
    const test = new Builder()
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_jest.html`
    test.templatesDir = path.resolve(__dirname,`../templates`)
    test.outputPath = path.resolve(__dirname,`../output`)
    test.outputPath += `/team_jest.html`

    await expect(test.fileClear(fp)).resolves.toBe(`Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html`)
    
    const log = jest.spyOn(global.console, `log`)
    await test.appendMain1(`Mayhem`)
    expect(log).toHaveBeenLastCalledWith('Appended main1')
})

test(`clearing and appending Main2 content to an existing file`, async () => {
    const test = new Builder()
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_jest.html`
    test.templatesDir = path.resolve(__dirname,`../templates`)
    test.outputPath = path.resolve(__dirname,`../output`)
    test.outputPath += `/team_jest.html`

    await expect(test.fileClear(fp)).resolves.toBe(`Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html`)
    
    const log = jest.spyOn(global.console, `log`)
    await test.appendMain2()
    expect(log).toHaveBeenLastCalledWith('Appended main2')
})

test(`clearing and appending to an existing file`, async () => {
    const array = {
            employeeId: '02418',
            position: 'manager',
            name: 'Heather Stolz',
            email: 'heather.stolz@gmail.com',
            organization: 'Infrastructure Engineering'
        } 

    const test = new Builder()
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_jest.html`
    test.templatesDir = path.resolve(__dirname,`../templates`)
    test.outputPath = path.resolve(__dirname,`../output`)
    test.outputPath += `/team_jest.html`
    test.counter = 4

    await expect(test.fileClear(fp)).resolves.toBe(`Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html`)
    
    const log = jest.spyOn(global.console, `log`)
    await test.appendSingle(array,`organization`)
    expect(log).toHaveBeenLastCalledWith('Appended manager')
})

test(`clearing and appending an array of content to an existing file`, async () => {
    const array = [
        {
            employeeId: '84351',
            position: 'engineer',
            name: 'Brian Soldani',
            email: 'briansoldani@gmail.com',
            recursive: true,
            attr_type: 'github',
            attr_value: 'BrianSoldani'
        } ,
        {
            employeeId: '18383',
            position: 'engineer',
            name: 'Karyn Clarke',
            email: 'karynclarke@gmail.com',
            recursive: true,
            attr_type: 'github',
            attr_value: 'karynclarke'
        },
        {
            employeeId: '50717',
            position: 'engineer',
            name: 'Echo',
            email: 'echoecho@gmail.com',
            recursive: false,
            attr_type: 'github',
            attr_value: 'Weerklank'
        }
    ]
    const test = new Builder()
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_jest.html`
    test.templatesDir = path.resolve(__dirname,`../templates`)
    test.outputPath = path.resolve(__dirname,`../output`)
    test.outputPath += `/team_jest.html`
    test.counter = 4

    await expect(test.fileClear(fp)).resolves.toBe(`Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html`)
    const log = jest.spyOn(global.console, `log`)
    await test.appendArray(array)
    expect(log).toHaveBeenLastCalledWith('Appended endDiv')
})