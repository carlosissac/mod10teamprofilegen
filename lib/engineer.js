const { Employee } = require(`./employee`)

const Engineer = function () {
    Employee.call(this)
    this.recursive = ``
    this.github = ``
    this.position = `engineer`
}

Engineer.prototype = Object.create(Employee.prototype)

module.exports = { Engineer }