const request = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../../app')
const { User } = require('../../models/user')

const { port, dbHostTest } = require('../../config/config')

describe("test auth routes", () => {
    let server;

    beforeAll(async () => {
        await mongoose.connect(dbHostTest)
        server = app.listen(port)
    })

    afterAll(async () => {
        await mongoose.connection.close()
        server.close()
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    beforeEach(() => { })

    describe(" sign up route", () => {
        test('sign up with correct data', async () => {
            const user = {
                firstname: "Vlad",
                lastname: "Skliar",
                email: 'awd@example.com',
                password: '12345678'
            }

            const { statusCode, body } = await request(app).post('/api/auth/register').send(user)

            expect(statusCode).toBe(201)
            expect(body.user.email).toBe(user.email)
            expect(body.user.firstname).toBe(user.firstname)

            const userEntity = await User.findOne({ email: user.email })

            expect(userEntity.firstname).toBe(user.firstname)
            expect(userEntity.lastname).toBe(user.lastname)
        })

        test('sign up with wrong data', async () => {
            const user = {
                email: 'awd@example.com',
                password: '12345678',
            }

            const { statusCode, body } = await request(app).post('/api/auth/register').send(user)

            expect(statusCode).toBe(400)
        })

        test('sign up with wrong data', async () => {
            const user = {
                firstname: "Vlad",
                lastname: "Skliar",
                password: '12345678'
            }

            const { statusCode, body } = await request(app).post('/api/auth/register').send(user)

            expect(statusCode).toBe(400)
            expect(body).toHaveProperty('message')
        })
    })

    describe('sign in route', () => {
        it('sign in with correct data', async () => {
            const userData = {
                firstname: "Vlad",
                lastname: "Skliar",
                email: 'awd@example.com',
                password: await bcrypt.hash('12345678', 10)
            }

            const loginData = {
                email: 'awd@example.com',
                password: '12345678'
            }

            const user = await User.create(userData)

            const { statusCode, body } = await request(app).post('/api/auth/login').send(loginData)

            expect(statusCode).toBe(200)
            expect(body).toHaveProperty('accessToken')
            expect(body.user.email).toBe(loginData.email)
        })
    })
})