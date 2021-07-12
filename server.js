require("dotenv").config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.json())

const posts = [
    {
        user_name: "Dhruvik",
        title: "Post 1"
    },
    {
        user_name: "Aryan",
        title: "Post 2"
    },
    {
        user_name: "Akshay",
        title: "Post 3"
    },
    {
        user_name: "Hiren",
        title: "Post 4"
    },
    {
        user_name: "Akshit",
        title: "Post 5"
    }
]

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.user_name === req.user.name))
})

app.post("/login", (req, res) => {
    const user_name = req.body.user_name
    const user = { name: user_name }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

app.listen(3000)