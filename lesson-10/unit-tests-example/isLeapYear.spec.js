/*
1. function should accept year as integer argument and return boolean value
2. if function receives qrong format it should throw exception
3. if arguments undifined should be throwed specific exception

2004 - true
2020 - true
1900 - false
1600 - true

2004.4 - error 'year must be an integer'
'2004' - erorr 'year must be a number'
false, true - erorr 'year must be a number'
undefined, () - eror 'year is required'
null - erorr 'year must be a number'
{} - erorr 'year must be a number'
[] - erorr 'year must be a number'
() => {} - erorr 'year must be a number'
*/

const isLeapYear = require("./isLeapYear")


describe('Test isLeapYear function', () => {
    test('2004 - true', () => {
        const result = isLeapYear(2004)
        expect(result).toBe(true)
        /*
        const expect = (result) => {
            return {
                result,
                toBe(value) {
                    return this.result == value
                }
            }
        }
        */
    })

    it('2020 - true', () => {
        const result = isLeapYear(2020)

        expect(result).toBe(true)
    })

    it('1900 - false', () => {
        const result = isLeapYear(1900)

        expect(result).toBe(false)
    })

    it('1600 - true', () => {
        const result = isLeapYear(1600)

        expect(result).toBe(true)
    })

    it("2004.4 - error 'year must be an integer'", () => {
        expect(() => isLeapYear(2004.4)).toThrow('year must be an integer')
    })

    it("'2004' - erorr 'year must be a number'", () => {
        expect(() => isLeapYear('2004')).toThrow('year must be a number')
    })

    it("false, true - erorr 'year must be a number'", () => {
        expect(() => isLeapYear(false)).toThrow('year must be a number')
        expect(() => isLeapYear(true)).toThrow('year must be a number')
    })

    it("undefined, () - eror 'year is required'", () => {
        expect(() => isLeapYear()).toThrow('year is required')
        expect(() => isLeapYear(undefined)).toThrow('year is required')
    })

    it("null - erorr 'year must be a number'", () => {
        expect(() => isLeapYear(null)).toThrow('year must be a number')
    })

    it("{} - erorr 'year must be a number'", () => {
        expect(() => isLeapYear({})).toThrow('year must be a number')
    })

    it("[] - erorr 'year must be a number'", () => {
        expect(() => isLeapYear([])).toThrow('year must be a number')
    })

    it("() => {} - erorr 'year must be a number'", () => {
        expect(() => isLeapYear({})).toThrow('year must be a number')
    })
})