const { Employee } = require(`./employee`)

const ProductOwner = function () {
    Employee.call(this)
    this.costcenter = ``
    this.position = `productowner`
}

ProductOwner.prototype = Object.create(Employee.prototype)

module.exports = { ProductOwner }