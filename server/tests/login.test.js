const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('Login', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {},
      truncate: false
    })
  }, 100000)

  test('Succeeds with valid username and password', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'Test User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/login')
      .send({
        username: newUser.username,
        password: newUser.password
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('Fails with invalid username', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'Test User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/login')
      .send({
        username: 'test',
        password: newUser.password
      })
      .expect(401)
  }, 100000)

  test('Fails with invalid password', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'Test User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/login')
      .send({
        username: newUser.username,
        password: 'test'
      })
      .expect(401)
  }, 100000)
})