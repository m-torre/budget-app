const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User } = require('../models')

router.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!password || !passwordFormat.test(password)) {
      return res.status(400).json({
        error: 'Invalid password'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
      username,
      name,
      passwordHash
    })
    res.status(201).json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = router