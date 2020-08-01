const { Writer } = require(`../helper/writer`)
const path = require('path')

test(`confirm error message is console logged`, () => {
    const test = new Writer()
    const log = jest.spyOn(global.console, `log`)
    test.handleError(`error`)
    expect(log).toHaveBeenCalledWith(`File Write Error >>>> error`)
})

test(`clearing and appending content of an existing file`, async () => {
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_jest.html`
    const test = new Writer()
    const content1 = `abcdefg`
    const content2 = `hijklmn`
    const id1 = `id1`
    const id2 = `id2`
    await expect(test.fileClear(fp)).resolves.toBe(`Cleared /Users/stux_xyz/code/mod10teamprofilegen/output/team_jest.html`)
    await expect(test.fileAppend(fp, content1, id1)).resolves.toBe(`Appended id1`)
    await expect(test.fileAppend(fp, content2, id2)).resolves.toBe(`Appended id2`)
})  

test(`error when trying to append content to a non-existing file`, async () => {
    let fp = path.resolve(__dirname,`../output`)
    fp += `/team_locked.html`
    const test = new Writer()
    const content = `abcdefg`
    const id = `id`
    await expect(test.fileAppend(fp, content, id)).rejects.toThrow(`EPERM: operation not permitted, open '/Users/stux_xyz/code/mod10teamprofilegen/output/team_locked.html'`)
})