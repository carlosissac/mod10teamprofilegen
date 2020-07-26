const { Employee } = require(`./employee`)

const QA = function () {
    Employee.call(this)
    this.recursive = ``
    this.phase = ``
    this.position = `qa`
}

QA.prototype = Object.create(Employee.prototype)

module.exports = { QA }