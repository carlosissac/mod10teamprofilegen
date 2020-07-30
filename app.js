const { Manager } = require('./lib/manager')
const { ProductOwner } = require('./lib/productowner')
const { ScrumMaster } = require('./lib/scrummaster')
const { TechLead } = require('./lib/techlead')
const { QA } = require('./lib/qa')
const { Engineer } = require('./lib/engineer')
const { Intern } = require('./lib/intern')

const { Builder } = require('./helper/builder')

const inquirer = require('inquirer')
const colors = require(`colors`)
const moment = require('moment')

const Project = function() {
    this.attributes()
    this.inquirerElements()
    this.projectCapture()
}

Project.prototype.attributes = function() {
    this.projectName = ``
    this.manager = new Manager()
    this.productowner = new ProductOwner()
    this.scrummaster = new ScrumMaster()
    this.techlead = new TechLead()
    this.engineer = new Engineer()
    this.qa = new QA()
    this.intern = new Intern()
    this.builder = new Builder()

    this.array_engineer = []
    this.array_qa = []
    this.array_intern = []

    this.capture_lock = 0
    this.tmc_lock = 0
}

Project.prototype.validateInput = function(text) {
    if(text !== ``) {
        return true
    }
    else {
        console.log(` NO INPUT DETECTED, TRY AGAIN`.brightRed)
    }
}

Project.prototype.inquirerElements = function() {

    this.qproject = {
        type: `input`,
        name: `attribute`, //projectName
        message: `PROJECT NAME :`.yellow,
        validate: this.validateInput
    }

    this.qname = {
        type: `input`,
        name: `attribute`, //name
        message: `NAME`.yellow,
        validate: this.validateInput
    }

    this.qemail = {
        type: `input`,
        name: `attribute`, //email
        message: `EMAIL`.yellow,
        validate: this.validateInput
    }

    this.qmanager = {
        type: `list`,
        name: `attribute`, //managerOrg
        message: `ORGANIZATION`.yellow,
        choices: [`Business Intelligence`,`Infrastructure Engineering`,`Software Engineering`,`InfoSec`, `Industrial Design`, `Mechanical Engineering`, `Firmware Engineering`]
    }

    this.qproductowner = {
        type: `input`,
        name: `attribute`, //poCostCenter
        message: `COST CENTER`.yellow,
        validate: this.validateInput
    }

    this.qscrummaster = {
        type: `input`,
        name: `attribute`, //smProjectCode
        message: `PROJECT CODE`.yellow,
        validate: this.validateInput
    }

    this.qtechlead = {
        type: `list`,
        name: `attribute`, //tlArea
        message: `AREA:`.yellow,
        choices: [`Analytics`,`A.I.`,`Front-End`,`Back-End`,`Materials`,`PCB Design`,`Firmware Dev`,`DBA`,`InfoSec Blue Team`,`Infosec Red Team`]
    }

    this.qqa = {
        type: `list`,
        name: `attribute`, //qaPhase
        message: `TESTING PHASE`.yellow,
        choices: [`Manual Testing`,`Automation Testing`,`User Acceptance Testing`,`System Integration Testing`,`Performance Testing`,`Material Testing`,`Penetration Testing`,`Disaster Recovery`]
    }

    this.qengineer = {
        type: `input`,
        name: `attribute`, //eGitHub
        message: `GITHUB REPO:`.yellow,
        validate: this.validateInput
    }

    this.qintern = {
        type: `input`,
        name: `attribute`, //iSchool
        message: `SCHOOL:`.yellow,
        validate: this.validateInput
    }

    this.qrecursive = {
        type : `confirm`,
        name : `attribute`, //askAgain
        message : `ADD ANOTHER?`.yellow, 
        default : true
    }
}

Project.prototype.projectNameCapture = async function() {
    const pn = await inquirer.prompt(this.qproject)
    this.projectName = pn.attribute
    this.capture_lock++
}

Project.prototype.teamMemberCapture = async function(position, targetPropertyType) {
    let n = ``
    let e = ``
    let atr = ``

    const positionUpperCase = position.toUpperCase()
    console.log(`${positionUpperCase} CAPTURE`.green)

    while(this.tmc_lock<4) {
        switch (this.tmc_lock) {
            case 0:
                const name = await inquirer.prompt(this.qname)
                n = name.attribute
                this.tmc_lock++
            break
            case 1:
                const email = await inquirer.prompt(this.qemail)
                e = email.attribute
                this.tmc_lock++
            break
            case 2:
                const target = await inquirer.prompt(this[`q${position}`])
                atr = target.attribute
                this.tmc_lock++
            break
            case 3:
                const ts = moment().format('x')
                this[`${position}`].setProperty(`employeeId`, ts.slice(ts.length-5))
                this[`${position}`].setProperty(`name`, n)
                this[`${position}`].setProperty(`email`, e)
                this[`${position}`].setProperty(targetPropertyType, atr)
                this.tmc_lock++
                this.builder.elements++
            break
            default:
                console.log(`teamMemberCapture NOT AN OPTION`)
            break
        }
    }
    this.capture_lock++
}

Project.prototype.teamMemberRecursive = async function(position, targetPropertyType) {
    let n = ``
    let e = ``
    let atr = ``
    let rec = ``

    this[`${position}`].setProperty(`name`, ``)
    this[`${position}`].setProperty(`email`, ``)
    this[`${position}`].setProperty(targetPropertyType, ``)
    this[`${position}`].setProperty(`recursive`, ``)

    this.tmc_lock = 0
    
    while(this.tmc_lock<5) {
        switch (this.tmc_lock) {
            case 0:
                const name = await inquirer.prompt(this.qname)
                n = name.attribute
                this.tmc_lock++
            break
            case 1:
                const email = await inquirer.prompt(this.qemail)
                e = email.attribute
                this.tmc_lock++
            break
            case 2:
                const target = await inquirer.prompt(this[`q${position}`])
                atr = target.attribute
                this.tmc_lock++
            break
            case 3:
                const recursive = await inquirer.prompt(this.qrecursive)
                rec = recursive.attribute
                this.tmc_lock++
            break
            case 4:
                const ts = moment().format('x')
                this[`${position}`].setProperty(`employeeId`, ts.slice(ts.length-5))
                this[`${position}`].setProperty(`name`, n)
                this[`${position}`].setProperty(`email`, e)
                this[`${position}`].setProperty(targetPropertyType, atr)
                this[`${position}`].setProperty(`recursive`, rec)
                this.tmc_lock++
                this.builder.elements++
            break
            default:
                console.log(`teamMemberCapture NOT AN OPTION`)
            break
        }
    }
}

Project.prototype.recursiveCapture = async function(position, targetPropertyType) {

    const positionUpperCase = position.toUpperCase()
    console.log(`${positionUpperCase} CAPTURE`.green)
    
    const promise = await this.teamMemberRecursive(position, targetPropertyType)

    const new_tm = {
        'employeeId': this[`${position}`].getProperty(`employeeId`),
        'position': this[`${position}`].getProperty(`position`),
        'name': this[`${position}`].getProperty(`name`),
        'email': this[`${position}`].getProperty(`email`),
        'recursive': this[`${position}`].getProperty(`recursive`),
        'attr_type': targetPropertyType,
        'attr_value': this[`${position}`].getProperty(targetPropertyType)         
    }

    const len = this[`array_${position}`].push(new_tm)
    const rec = this[`${position}`].getProperty(`recursive`)
    
    if(rec) {
        await this.recursiveCapture(position, targetPropertyType)
    }
    else {
        this.capture_lock++
        return 
    }
}

Project.prototype.htmlBuilder = async function() {
    let i = 0
    let j = 0
    while(i<10) {
        switch(i) {
            case 0:
                await this.builder.clearContent()
                i++
            break
            case 1:
                await this.builder.appendMain1(this.projectName)
                i++
            break
            case 2:
                await this.builder.appendSingle(this.manager,`organization`)
                i++
            break
            case 3:
                await this.builder.appendSingle(this.productowner,`costcenter`)
                i++
            break
            case 4:
                await this.builder.appendSingle(this.scrummaster,`projectcode`)
                i++
            break
            case 5:
                await this.builder.appendSingle(this.techlead,`area`)
                i++
            break
            case 6:
                await this.builder.appendArray(this.array_engineer)
                i++
            break
            case 7:
                await this.builder.appendArray(this.array_qa)
                i++
            break
            case 8:
                await this.builder.appendArray(this.array_intern)
                i++
            break
            case 9:
                await this.builder.appendMain2()
                i++
            break
            default:
                console.log(`htmlBuilder NOT AN OPTION`)
            break
        }
        
    }
    this.capture_lock++
}

Project.prototype.projectCapture = async function() {
    while(this.capture_lock<9) {
        switch(this.capture_lock) {
            case 0:
                const pn = await this.projectNameCapture()
                //this.capture_lock++
            break
            case 1:
                this.tmc_lock = 0
                const m = await this.teamMemberCapture(`manager`,`organization`)
                //this.capture_lock++
            break
            case 2:
                this.tmc_lock = 0
                const po = await this.teamMemberCapture(`productowner`,`costcenter`)
                //this.capture_lock++
            break
            case 3:
                this.tmc_lock = 0
                const sm = await this.teamMemberCapture(`scrummaster`, `projectcode`)
                //this.capture_lock++
            break
            case 4:
                this.tmc_lock = 0
                const tl = await this.teamMemberCapture(`techlead`,`area`)
                //this.capture_lock++
            break
            case 5:
                this.tmc_lock = 0
                const e = await this.recursiveCapture(`engineer`,`github`)
                //this.capture_lock++
            break
            case 6:
                this.tmc_lock = 0
                const qa = await this.recursiveCapture(`qa`,`phase`)
                //this.capture_lock++
            break
            case 7:
                this.tmc_lock = 0
                const i = await this.recursiveCapture(`intern`,`school`)
                //this.capture_lock++
            break
            case 8:
                this.tmc_lock = 0
                await this.htmlBuilder()
                //this.capture_lock++
            break
            default:
                console.log(`projectCapture NOT AN OPTION`)
            break
        }
    }
}

prj = new Project()

module.exports.project = prj
