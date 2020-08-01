const moment = require('moment')

const Employee = function () {
    this.employeeId = ``
    this.position = `employee`
    this.name = ``
    this.email = ``
}

Employee.prototype.setProperty = function(targetProperty, value) {
    this[targetProperty] = value
}

Employee.prototype.getProperty = function(targetProperty) {
    return this[targetProperty]
}

module.exports = { Employee }