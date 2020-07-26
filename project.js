const { Manager } = require('./libraries/manager')
const { ProductOwner } = require('./libraries/productowner')
const { ScrumMaster } = require('./libraries/scrummaster')
const { TechLead } = require('./libraries/techlead')
const { QA } = require('./libraries/qa')
const { Engineer } = require('./libraries/engineer')
const { Intern } = require('./libraries/intern')

const inquirer = require('inquirer')
const path = require(`path`)
const fs = require(`fs`)
const colors = require(`colors`)

const Project = function() {
    this.attributes()
    this.inquirerElements()
    this.projectCapture()
}

Project.prototype.setProperty = function(targetProperty, value) {
    this[targetProperty] = value
}

Project.prototype.attributes = function() {
    this.manager = new Manager()
    this.productowner = new ProductOwner()
    this.scrummaster = new ScrumMaster()
    this.techlead = new TechLead()
    this.engineer = new Engineer()
    this.qa = new QA()
    this.intern = new Intern()

    this.array_engineer = []
    this.array_qa = []
    this.array_intern = []

    this.capture_lock = 0
    this.tmc_lock = 0
    
    this.position = `` 
    this.targetPropertyType = ``
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
                this[`${position}`].setProperty(`name`, n)
                this[`${position}`].setProperty(`email`, e)
                this[`${position}`].setProperty(targetPropertyType, atr)
                this.tmc_lock++
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
                this[`${position}`].setProperty(`name`, n)
                this[`${position}`].setProperty(`email`, e)
                this[`${position}`].setProperty(targetPropertyType, atr)
                this[`${position}`].setProperty(`recursive`, rec)
                this.tmc_lock++
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
    const len = this[`array_${position}`].push(this[`${position}`])
    const rec = this[`array_${position}`][len-1].getProperty(`recursive`)
    
    if(rec) {
        await this.recursiveCapture(position, targetPropertyType)
    }
    else {
        this.capture_lock++
        return 
    }
}

Project.prototype.projectCapture = async function() {
    while(this.capture_lock<8) {
        switch(this.capture_lock) {
            case 0:
                const pn = await inquirer.prompt(this.qproject)
                this.capture_lock++
            break
            case 1:
                this.tmc_lock = 0
                const m = await this.teamMemberCapture(`manager`,`organization`)
            break
            case 2:
                this.tmc_lock = 0
                const po = await this.teamMemberCapture(`productowner`,`costcenter`)
            break
            case 3:
                this.tmc_lock = 0
                const sm = await this.teamMemberCapture(`scrummaster`,`projectcode`)
            break
            case 4:
                this.tmc_lock = 0
                const tl = await this.teamMemberCapture(`techlead`,`area`)
            break
            case 5:
                this.tmc_lock = 0
                const e = await this.recursiveCapture(`engineer`, `github`)
            break
            case 6:
                this.tmc_lock = 0
                const qa = await this.recursiveCapture(`qa`, `phase`)
            break
            case 7:
                this.tmc_lock = 0
                const i = await this.recursiveCapture(`intern`, `school`)
            break
            case 8:
                this.tmc_lock = 0
                
            break
            default:
                console.log(`projectCapture NOT AN OPTION`)
            break
        }
    }
}

prj = new Project()
