const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Budget = require('../models/budget')
const User = require('../models/user')

describe('Addition of a new budget', () => {
  beforeEach(async () => {
    await Budget.destroy({
      where: {},
      truncate: false
    })
    await User.destroy({
      where: {},
      truncate: false
    })
  }, 100000)

  test('Fails if user is not logged in', async () => {
    const newBudget = {
      category: 'Food',
      amount: 100
    }

    await api
      .post('/api/budgets')
      .send(newBudget)
      .expect(401)
  }, 100000)

  describe('If user is logged in', () => {
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

      const loggedUser = await api
        .post('/api/login')
        .send({
          username: newUser.username,
          password: newUser.password
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBudget = {
        category: 'Food',
        amount: 100
      }

      await api
        .post('/api/budgets')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newBudget)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const budgetsAtEnd = await helper.budgetsInDb()
      expect(budgetsAtEnd.length).toBe(1)

      const categories = budgetsAtEnd.map(budget => budget.category)
      expect(categories).toContain(
        'Food'
      )
    }, 100000)

    test('Fails with null category', async () => {
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

      const loggedUser = await api
        .post('/api/login')
        .send({
          username: newUser.username,
          password: newUser.password
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBudget = {
        category: null,
        amount: 100
      }

      await api
        .post('/api/budgets')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newBudget)
        .expect(400)
    }, 100000)

    test('Fails with empty category', async () => {
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

      const loggedUser = await api
        .post('/api/login')
        .send({
          username: newUser.username,
          password: newUser.password
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBudget = {
        category: '',
        amount: 100
      }

      await api
        .post('/api/budgets')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newBudget)
        .expect(400)
    }, 100000)

    test('Fails with invalid category format', async () => {
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

      const loggedUser = await api
        .post('/api/login')
        .send({
          username: newUser.username,
          password: newUser.password
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBudget = {
        category: 'Food 1',
        amount: 100
      }

      await api
        .post('/api/budgets')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newBudget)
        .expect(400)
    }, 100000)

    test('Fails with null amount', async () => {
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

      const loggedUser = await api
        .post('/api/login')
        .send({
          username: newUser.username,
          password: newUser.password
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBudget = {
        category: 'Food',
        amount: null
      }

      await api
        .post('/api/budgets')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newBudget)
        .expect(400)
    }, 100000)
  })
})

describe('When there are some budgets saved', () => {
  beforeEach(async () => {
    await Budget.destroy({
      where: {},
      truncate: false
    })
    await User.destroy({
      where: {},
      truncate: false
    })
    await Budget.bulkCreate(helper.initialBudgets)
  }, 100000)

  test('Budgets are returned as JSON', async () => {
    await api
      .get('/api/budgets')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('All budgets are returned', async () => {
    const response = await api.get('/api/budgets')

    expect(response.body).toHaveLength(helper.initialBudgets.length)
  }, 100000)

  test('A specific budget is within the returned budgets', async () => {
    const response = await api.get('/api/budgets')

    const categories = response.body.map(budget => budget.category)
    expect(categories).toContain(
      'Food'
    )
  }, 100000)

  describe('Viewing a specific budget', () => {
    test('Succeeds with a valid id', async () => {
      const budgetsAtStart = await helper.budgetsInDb()

      const budgetToView = budgetsAtStart[0]
      delete budgetToView.user

      const resultBudget = await api
        .get(`/api/budgets/${budgetToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      delete resultBudget.body.userId

      expect(resultBudget.body).toEqual(budgetToView)
    }, 100000)

    test('Fails if budget does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/budgets/${validNonexistingId}`)
        .expect(404)
    }, 100000)

    test('Fails if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/budgets/${invalidId}`)
        .expect(400)
    }, 100000)
  })

  describe('Update of a budget', () => {
    test('Fails if user is not logged in', async () => {
      const budgetsAtStart = await helper.budgetsInDb()
      const budgetToUpdate = budgetsAtStart[0]

      const updatedBudget = {
        category: 'Food',
        amount: 17
      }

      await api
        .put(`/api/budgets/${budgetToUpdate.id}`)
        .send(updatedBudget)
        .expect(401)
    }, 100000)

    describe('If user is logged in', () => {
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

        const loggedUser = await api
          .post('/api/login')
          .send({
            username: newUser.username,
            password: newUser.password
          })
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const budgetsAtStart = await helper.budgetsInDb()
        const budgetToUpdate = budgetsAtStart[0]

        const updatedBudget = {
          amount: 170
        }

        await api
          .put(`/api/budgets/${budgetToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedBudget)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with null amount', async () => {
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

        const loggedUser = await api
          .post('/api/login')
          .send({
            username: newUser.username,
            password: newUser.password
          })
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const budgetsAtStart = await helper.budgetsInDb()
        const budgetToUpdate = budgetsAtStart[0]

        const updatedBudget = {
          amount: null
        }

        await api
          .put(`/api/budgets/${budgetToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedBudget)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)
    })
  })

  describe('Deletion of a budget', () => {
    test('Fails if user is not logged in', async () => {
      const budgetsAtStart = await helper.budgetsInDb()
      const budgetToDelete = budgetsAtStart[0]

      await api
        .delete(`/api/budgets/${budgetToDelete.id}`)
        .expect(401)
    }, 100000)

    describe('If user is logged in', () => {
      test('Succeeds with a valid id', async () => {
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

        const loggedUser = await api
          .post('/api/login')
          .send({
            username: newUser.username,
            password: newUser.password
          })
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const budgetsAtStart = await helper.budgetsInDb()
        const budgetToDelete = budgetsAtStart[0]

        await api
          .delete(`/api/budgets/${budgetToDelete.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .expect(204)

        const budgetsAtEnd = await helper.budgetsInDb()

        expect(budgetsAtEnd).toHaveLength(
          helper.initialBudgets.length - 1
        )

        const categories = budgetsAtEnd.map(budget => budget.category)

        expect(categories).not.toContain(budgetToDelete.category)
      }, 100000)

      test('Fails if id is invalid', async () => {
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

        const loggedUser = await api
          .post('/api/login')
          .send({
            username: newUser.username,
            password: newUser.password
          })
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const invalidId = '5a3d5da59070081a82a3445'

        await api
          .delete(`/api/budgets/${invalidId}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .expect(400)
      }, 100000)
    })
  })
})