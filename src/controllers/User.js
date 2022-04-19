const jwt = require('jsonwebtoken')
const User = require('../models/User')
const checkLeagueValidation = require('../services/checkLeagueValidation')
const startLeagueValidation = require('../services/startLeagueValidation')
const generateToken = require('../utils/generateToken')

module.exports = {
    async create(req, res) {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe!' })
        }

        try {
            const user = await User.create({
                name,
                email,
                password,
            })

            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error })
        }
    },
    async update(req, res) {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(400).json('Usuário não existe!')
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        try {
            const updateUser = await user.save()
            res.status(201).json(updateUser)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    async me(req, res) {
        if (
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            let token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userId = decoded.id

            // Fetch the user by id
            User.findOne({ _id: userId }).then(function (user) {
                // Do something with the user
                return res.status(200).json(user)
            })
        }
        return res.status(500)
    },
    async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe!' })
        }

        if (await user.matchPassword(password)) {
            const noPassUser = { ...user._doc }
            delete noPassUser.password

            res.status(200).json({
                user: noPassUser,
                token: generateToken(user._id),
            })
        } else {
            res.status(400).json({ error: 'Email ou senha inválido!' })
        }
    },
    async validate(req, res) {
        const user = await User.findById(req.params.id)

        if (!user) return res.status(400).json('Usuário não existe!')

        if (user.isLeagueValidated)
            return res.status(200).json('Usuário já validado!')

        const iconToValidate = await startLeagueValidation(user.name)

        user.validationIconId = iconToValidate

        try {
            const updateUser = await user.save()
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    async checkValidation(req, res) {
        const user = await User.findById(req.params.id)

        if (!user) res.status(400).json('Usuário não existe!')

        if (user.isLeagueValidated)
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isLeagueValidated: user.isLeagueValidated,
            })

        if (user.validationIconId === -1) {
            return res.status(200).json('Usuário não começou validação!')
        }

        const checkValidation = await checkLeagueValidation(
            user.name,
            user.validationIconId
        )

        if (!checkValidation) {
            return res.status(200).json('Usuário não está validado!')
        }

        user.isLeagueValidated = true

        try {
            const updateUser = await user.save()
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(400).json(error)
        }
    },
}
