const { Employee } = require(`./employee`)

const ScrumMaster = function () {
    Employee.call(this)
    this.projectcode = ``
    this.position = `scrummaster`
}

ScrumMaster.prototype = Object.create(Employee.prototype)

module.exports = { ScrumMaster }