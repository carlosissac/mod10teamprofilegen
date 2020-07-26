const { Employee } = require(`./employee`)

const Manager = function () {
    Employee.call(this)
    this.organization = ``
    this.position = `manager`
}

Manager.prototype = Object.create(Employee.prototype)

module.exports = { Manager }