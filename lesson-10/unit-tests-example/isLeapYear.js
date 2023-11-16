const isLeapYear = (year) => {
    const date = new Date(year, 2, 0)

    if (year === undefined) {
        throw new Error('year is required')
    }

    if (typeof year !== 'number') {
        throw new Error('year must be a number')
    }

    if (!Number.isInteger(year)) {
        throw new Error('year must be an integer')
    }

    return (date.getDate() === 29)
}

module.exports = isLeapYear