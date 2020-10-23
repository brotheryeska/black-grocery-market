class Helper {
    static toCurrency(number) {
        return `Rp. ${number.toLocaleString('id')},00`
    }
}

module.exports = Helper