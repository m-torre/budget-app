const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Transaction = require('../models/transaction')
const User = require('../models/user')

describe('Addition of a new transaction', () => {
  beforeEach(async () => {
    await Transaction.destroy({
      where: {},
      truncate: false
    })
    await User.destroy({
      where: {},
      truncate: false
    })
  }, 100000)

  test('Fails if user is not logged in', async () => {
    const newTransaction = {
      name: 'Dinner',
      amount: 17,
      date: '2022-04-28',
      type: 'expense',
      category: 'Food'
    }

    await api
      .post('/api/transactions')
      .send(newTransaction)
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const transactionsAtEnd = await helper.transactionsInDb()
      expect(transactionsAtEnd.length).toBe(1)

      const names = transactionsAtEnd.map(transaction => transaction.name)
      expect(names).toContain(
        'Dinner'
      )
    }, 100000)

    test('Fails with null name', async () => {
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

      const newTransaction = {
        name: null,
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with empty name', async () => {
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

      const newTransaction = {
        name: '',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with invalid name format', async () => {
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

      const newTransaction = {
        name: 'Test_Transaction',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with invalid name length', async () => {
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

      const newTransaction = {
        name: 'T',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
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

      const newTransaction = {
        name: 'Dinner',
        amount: null,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with null date', async () => {
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: null,
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with empty date', async () => {
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with invalid date format', async () => {
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '28/04/22',
        type: 'expense',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with null type', async () => {
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: null,
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with empty type', async () => {
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: '',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)

    test('Fails with invalid type format', async () => {
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: 'expense 1',
        category: 'Food'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: null
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: ''
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
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

      const newTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food 1'
      }

      await api
        .post('/api/transactions')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newTransaction)
        .expect(400)
    }, 100000)
  })
})

describe('When there are some transactions saved', () => {
  beforeEach(async () => {
    await Transaction.destroy({
      where: {},
      truncate: false
    })
    await User.destroy({
      where: {},
      truncate: false
    })
    await Transaction.bulkCreate(helper.initialTransactions)
  }, 100000)

  test('Transactions are returned as JSON', async () => {
    await api
      .get('/api/transactions')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('All transactions are returned', async () => {
    const response = await api.get('/api/transactions')

    expect(response.body).toHaveLength(helper.initialTransactions.length)
  }, 100000)

  test('A specific transaction is within the returned transactions', async () => {
    const response = await api.get('/api/transactions')

    const names = response.body.map(transaction => transaction.name)
    expect(names).toContain(
      'Dinner'
    )
  }, 100000)

  describe('Viewing a specific transaction', () => {
    test('Succeeds with a valid id', async () => {
      const transactionsAtStart = await helper.transactionsInDb()

      const transactionToView = transactionsAtStart[0]
      delete transactionToView.user

      const resultTransaction = await api
        .get(`/api/transactions/${transactionToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      delete resultTransaction.body.userId

      expect(resultTransaction.body).toEqual(transactionToView)
    }, 100000)

    test('Fails if transaction does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/transactions/${validNonexistingId}`)
        .expect(404)
    }, 100000)

    test('Fails if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/transactions/${invalidId}`)
        .expect(400)
    }, 100000)
  })

  describe('Update of a transaction', () => {
    test('Fails if user is not logged in', async () => {
      const transactionsAtStart = await helper.transactionsInDb()
      const transactionToUpdate = transactionsAtStart[0]

      const updatedTransaction = {
        name: 'Dinner',
        amount: 17,
        date: '2022-04-28',
        type: 'expense',
        category: 'Food'
      }

      await api
        .put(`/api/transactions/${transactionToUpdate.id}`)
        .send(updatedTransaction)
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Dinner',
          amount: 17,
          date: '2022-04-28',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with null name', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: null,
          amount: 17,
          date: '2022-04-28',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with empty name', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: '',
          amount: 17,
          date: '2022-04-28',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with invalid name format', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '2022-04-28',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with invalid name length', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'T',
          amount: 17,
          date: '2022-04-28',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Dinner',
          amount: null,
          date: '2022-04-28',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with null date', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: null,
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with empty date', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with invalid date format', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '28/04/22',
          type: 'expense',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with null type', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '2022-04-28',
          type: null,
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with empty type', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '2022-04-28',
          type: '',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('Fails with invalid type format', async () => {
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '2022-04-28',
          type: 'expense 1',
          category: 'Food'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '2022-04-28',
          type: 'expense',
          category: null
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '2022-04-28',
          type: 'expense',
          category: ''
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToUpdate = transactionsAtStart[0]

        const updatedTransaction = {
          name: 'Test_Transaction',
          amount: 17,
          date: '2022-28-04',
          type: 'expense',
          category: 'Food 1'
        }

        await api
          .put(`/api/transactions/${transactionToUpdate.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .send(updatedTransaction)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      }, 100000)
    })
  })

  describe('Deletion of a transaction', () => {
    test('Fails if user is not logged in', async () => {
      const transactionsAtStart = await helper.transactionsInDb()
      const transactionToDelete = transactionsAtStart[0]

      await api
        .delete(`/api/transactions/${transactionToDelete.id}`)
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

        const transactionsAtStart = await helper.transactionsInDb()
        const transactionToDelete = transactionsAtStart[0]

        await api
          .delete(`/api/transactions/${transactionToDelete.id}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .expect(204)

        const transactionsAtEnd = await helper.transactionsInDb()

        expect(transactionsAtEnd).toHaveLength(
          helper.initialTransactions.length - 1
        )

        const names = transactionsAtEnd.map(transaction => transaction.name)

        expect(names).not.toContain(transactionToDelete.name)
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
          .delete(`/api/transactions/${invalidId}`)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .expect(400)
      }, 100000)
    })
  })
})