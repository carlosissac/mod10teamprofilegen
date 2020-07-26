const { Employee } = require(`./employee`)

const TechLead = function () {
    Employee.call(this)
    this.area = ``
    this.position = `techlead`
}

TechLead.prototype = Object.create(Employee.prototype)

module.exports = { TechLead }