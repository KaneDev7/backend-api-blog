const { UsersModel } = require("../models/users")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const register = async (req, res) => {
    console.log('body', req.body)
    const {username, password } = req.body
    if (!username || !password) {
       return res.status(400).json({ message: 'incorrecte username or password' })
    }

    try {
        const user = await UsersModel.findOne({ where: { username } });
        console.log('user',user)
        if (user || user?.username.toLowerCase() === username.toLowerCase()) {
            return res.status(409).json({ message: 'username already existe' })
        }
        const passwordHash = await bcrypt.hash(password, 10)
        await UsersModel.create({ username, password: passwordHash })
        res.status(200).json({ message: 'user create successfully' })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).send({ message: 'incorrecte username or password' })
    }
    try {
        const user = await UsersModel.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'incorrect password or username' })
        }
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) return res.status(404).json({ message: 'incorrect password or username' })
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET,
        )
        const refreshToken = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            { expiresIn: '60s'}
        )
        await UsersModel.update({ jwt: token }, { where: { username } })
        res.cookie('token', refreshToken, { maxAge: 60000, httpOnly: true });
        res.status(200).json({username : user.username, token })
    
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    register,
    login
}