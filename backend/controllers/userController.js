import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generatorToken.js"

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invaild email or password")
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  const isEmailValid = () => {
    if (email.length < 6) {
      throw new Error("email must between 6 to 8 charachters")
    }
    return true
  }

  const isPasswordValid = () => {
    if (password.length < 6 || password.length > 12) {
      throw new Error(
        "the password must have between 6 to 12 charachters"
      )
    }
    return true
  }

  const isNameValid = () => {
    if (name.length < 6 || name.length > 12) {
      throw new Error("name must be between 8 to 15 charachters!!")
    }
    return true
  }

  if (userExists) {
    res.status(400)
    throw new Error("user already exist!")
  } else {
    const nameValid = isNameValid()
    const emailValid = isEmailValid()
    const passwordValid = isPasswordValid()

    if (nameValid && emailValid && passwordValid) {
      const user = await User.create({
        name,
        email,
        password,
      })
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        console.log(nameError)
        res.status(400)
        throw new Error("Invalid data")
      }
    }
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
