const { Writer } = require('./writer')
const path = require('path')
const fs = require('fs')

const Builder = function() {
    Writer.call(this)
    this.counter = 0
    this.total = 0 
    this.elements = 0
    this.templatesDir = path.resolve(__dirname,`../templates`)
    this.outputPath = path.resolve(__dirname,`../output`)
    this.outputPath += `/team.html`
}

Builder.prototype = Object.create(Writer.prototype)

Builder.prototype.appendStartRow = async function() {
    let buffer = ``
    const fileName = `sqRow.html`
    const fullPath = path.resolve(this.templatesDir, fileName)
    buffer = fs.readFileSync(fullPath, "utf8")

    if(this.counter === 0) {
        let promise = await Promise.all([this.fileAppend(this.outputPath, buffer, `sqRow`)])
        console.log(String(promise))
    }
}

Builder.prototype.appendEndDiv = async function() {
    let buffer = ``
    const fileName = `endDiv.html`
    const fullPath = path.resolve(this.templatesDir, fileName)
    buffer = fs.readFileSync(fullPath, "utf8")

    if((this.counter === 2) || (this.total === this.elements)) {
        let promise = await Promise.all([this.fileAppend(this.outputPath, buffer, `endDiv`)])
        console.log(String(promise))
    }
}

Builder.prototype.clearContent = async function() {
    let promise = await Promise.all([this.fileClear(this.outputPath)])
    console.log(String(promise))
}

Builder.prototype.appendMain2 = async function() {
    let buffer = ``
    const fileName = `main2.html`
    const fullPath = path.resolve(this.templatesDir, fileName)
    buffer = fs.readFileSync(fullPath, "utf8")

    let promise = await Promise.all([this.fileAppend(this.outputPath, buffer, `main2`)])
    console.log(String(promise))
}

Builder.prototype.appendMain1 = async function(projectName) {
    let buffer = ``
    const fileName = `main1.html`
    const fullPath = path.resolve(this.templatesDir, fileName)
    buffer = fs.readFileSync(fullPath, "utf8")
    const patternName = new RegExp(`{{ Project Name }}`, `gm`)
    buffer = buffer.replace(patternName, projectName)

    let promise = await Promise.all([this.fileAppend(this.outputPath, buffer, `main1`)])
    console.log(String(promise))
}

Builder.prototype.appendSingle = async function(object, targetProperty) {

    if(this.counter > 2) {
        this.counter = 0
    }
    this.total++

    let buffer = ``
    const fileName = `${object.position}.html`
    const fullPath = path.resolve(this.templatesDir, fileName)
    buffer = fs.readFileSync(fullPath, "utf8")
    const patternName = new RegExp(`{{ name }}`, `gm`)
    buffer = buffer.replace(patternName, object.name)
    const patternId = new RegExp(`{{ ID }}`, `gm`)
    buffer = buffer.replace(patternId, object.employeeId)
    const patternAttribute = new RegExp(`{{ attribute }}`, `gm`)
    buffer = buffer.replace(patternAttribute, object[`${targetProperty}`])
    
    await this.appendStartRow()
    let p = await Promise.all([this.fileAppend(this.outputPath, buffer, object.position)])
    console.log(String(p))
    await this.appendEndDiv()
    this.counter++
}

Builder.prototype.appendArray = async function(array) {
    let patternName = ``
    let patternId = ``
    let patternAttribute = ``
    let buffer = ``
    let val_n = ``
    let val_ei = ``
    let val_av = ``
    const fileName = `${array[0].position}.html`
    const fullPath = path.resolve(this.templatesDir, fileName)

    for(let i = 0; i < array.length; i++) {

        if(this.counter > 2) {
            this.counter = 0
        }
        this.total++

        buffer = fs.readFileSync(fullPath, "utf8")
        patternName = new RegExp(`{{ name }}`, `gm`)        
        val_n = array[i].name
        buffer = buffer.replace(patternName, val_n)
        patternId = new RegExp(`{{ ID }}`, `gm`)
        val_ei = array[i].employeeId
        buffer = buffer.replace(patternId, val_ei)
        patternAttribute = new RegExp(`{{ attribute }}`, `gm`)
        val_av = array[i].attr_value
        buffer = buffer.replace(patternAttribute, val_av)
        
        await this.appendStartRow()
        let p = await Promise.all([this.fileAppend(this.outputPath, buffer, array[i].position)])
        console.log(String(p))
        await this.appendEndDiv()
        this.counter++

    }
}

module.exports = { Builder }
