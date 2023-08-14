const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userController = {

    login: async function (req,res){
        const selectedUser = await User.findOne({email: req.body.email})
        if(!selectedUser) return res.status(400).send('Email or passoword invalid')

        const userPasswordMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!userPasswordMatch) return res.status(400).send('Email or passoword invalid')

        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.SECRET_JWT);

        res.header('authorization-token', token)
        res.send('user logged')

      },

    register: async function (req,res){
        const selectedUser = await User.findOne({email: req.body.email})
        if(selectedUser) return res.status(400).send('Email already exists')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        try {
            const usersaved = await user.save()
            res.send(usersaved)
        } catch (error) {
            res.status(400).send(error)
        }
        }
}
module.exports = userController