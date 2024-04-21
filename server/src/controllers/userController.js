import asyncHandler from "express-async-handler";
import {User} from "../models/models.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({where:{ email }});

    if (user && (await bcrypt.compare(password, user.password))) {
        generateToken(res, user.id);

        res.json({
            id: user.id,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({where:{ email }});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 5);

    const user = await User.create({
        email,
        password: passwordHash
    }, {
        returning: true
    });

    if (user) {
        generateToken(res, user.id);
        res.status(201).json({
            id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: "get user profile"});
})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne({where: {id: req.user.id}});

    if (user) {
        let name = req.body.name || user.name;
        let email = req.body.email || user.email;
        let passwordHash;

        if (req.body.password) {
            passwordHash = await bcrypt.hash(req.body.password, 5);
        } else {
            passwordHash = user.password;
        }

        const updatedUser = await User.update({email, password: passwordHash}, {where: {id: user.id}});
        const updatedUserFromDb = await User.findOne({where: {id: user.id}});

        res.json({
            id: updatedUserFromDb.id,
            email: updatedUserFromDb.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}