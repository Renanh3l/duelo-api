const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /.+\@.+\..+/,
        },
        password: {
            type: String,
            required: true,
        },
        coins: {
            type: Number,
            required: false,
            default: 0,
        },
        isLeagueValidated: {
            type: Boolean,
            required: false,
            default: false,
        },
        validationIconId: {
            type: Number,
            required: false,
            default: -1,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPasword) {
    return await bcrypt.compare(enteredPasword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User
