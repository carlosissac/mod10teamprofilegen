const { Employee } = require(`./employee`)

const Intern = function () {
    Employee.call(this)
    this.recursive = ``
    this.school = ``
    this.position = `intern`
}

Intern.prototype = Object.create(Employee.prototype)

module.exports = { Intern }