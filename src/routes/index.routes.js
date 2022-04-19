const express = require('express')

const userController = require('../controllers/User')

const protect = require('../middleware/auth')

const router = express.Router()

router.route('/').post(userController.create)
router.route('/').get(userController.me)
router.route('/login').post(userController.login)
router.route('/:id').put(protect, userController.update)

// Começa a validação
router.route('/validate/:id').post(protect, userController.validate)

// Checa se validação foi feita e salva no usuário
router.route('/validate/:id').get(protect, userController.checkValidation)

module.exports = router
