const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Get All
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// Get One
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Create
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        dob: req.body.dob,
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

// Update
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.name!= null) {
        res.user.name = req.body.name
    }
    if(req.body.age!= null) {
        res.user.age = req.body.age
    }
    if(req.body.dob!= null) {
        res.user.dob = req.body.dob
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// Delete
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({message: 'User deleted'})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// middleware
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)

        if(user == null) {
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch(error) {
        return res.status(500).json({message: error.message})
    }

    res.user = user
    next()
}


module.exports = router