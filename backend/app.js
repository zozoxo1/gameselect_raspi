require('dotenv').config()
const password_hashing = require('./password_hashing')
const verify = require('./verify')
const bcrypt = require('bcrypt');
const express = require('express')
const jwt = require('jsonwebtoken')
let cors = require("cors");

const app = express()

app.use(express.json())
app.use(cors());

const jwt_secret_token = process.env.JWT_SECRET_TOKEN
const jwt_token_expire = process.env.JWT_TOKEN_EXPIRE

users = [
    {
        id: 1,
        username: 'admin',
        password: '$2b$10$SCgOWyJLdxPB70otBVuMG.B29P7Q7XfhmK40E67y/CKv0OblLsmJa',
        role: 'admin' // admin / user
    }
]

app.post('/api/token', verify.verifyToken, (req, res) => {
    res.json({
        message: "token valid"
    })
})

app.post('/api/start', verify.verifyToken, verify.verifyAdminPermission, (req, res) => {
    res.json({
        message: "Game started",
        auth_data: req.auth_data
    })   
})

app.post('/api/login', async (req, res) => {
    const user = users.find(user => user.username == req.body.username)

    if(!user) {
        res.status(404).json({
            message: "User not found"
        })
        return
    }

    try {
        if(!await bcrypt.compare(req.body.password, user.password)) {
            res.status(403).json({
                message: "password incorrect"
            })
            return
        }
    } catch {
        res.status(500).send()
    }

    console.log(user)

    jwt.sign({user}, jwt_secret_token, {expiresIn: jwt_token_expire}, (err, token) => {
        res.json({
            token
        })
    })
})

app.listen(5000, () => console.log("Server listening on 5000"))