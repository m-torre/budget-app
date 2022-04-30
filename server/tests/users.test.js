const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const User = require('../models/user')

describe('Addition of a new user', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {},
      truncate: false
    })
  }, 100000)

  test('Succeeds with valid data', async () => {
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

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(1)
  }, 100000)

  test('Fails with null username', async () => {
    const newUser = {
      username: null,
      name: 'Test User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with empty username', async () => {
    const newUser = {
      username: '',
      name: 'Test User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with not unique username', async () => {
    const firstUser = {
      username: 'test@budget-app.com',
      name: 'First Test User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(firstUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const secondUser = {
      username: 'test@budget-app.com',
      name: 'Second Test User',
      password: 'testBudget2'
    }

    await api
      .post('/api/users')
      .send(secondUser)
      .expect(400)
  }, 100000)

  test('Fails with invalid email format', async () => {
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.username = 'test@budget-app'
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with null name', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: null,
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with empty name', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: '',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with invalid name format', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'Test_User',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.name = 'Test User 1'
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with invalid name length', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'T',
      password: 'testBudget1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.name = 'TU'
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with null password', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'Test User',
      password: null
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with empty password', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'Test User',
      password: ''
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)

  test('Fails with invalid password format', async () => {
    const newUser = {
      username: 'test@budget-app.com',
      name: 'Test User',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.password = 'test1'
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.password = 'test_budget'
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.password = 'test_Budget1'
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  }, 100000)
})