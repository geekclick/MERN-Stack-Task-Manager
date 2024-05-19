const express = require('express');
const router = express.Router();
const User = require('../../Models/user-model');
const bcrypt = require('bcryptjs');
const userService = require('./authService');
const { createResponse, createError } = require('../../Helpers');

class AuthController {
    async home(req, res) {
        try {
            createResponse(res, 200, "This is the home endpoint", null, 200);
        } catch (error) {
            createError(res, 400, error.message);
        }
    }

    async register(req, res) {
        try {
            const user = await userService.addNewUser(req, res);
            if (user) {

                createResponse(res, 200, "New user created successfully!", user, 200);
            } else {
                createError(res, 400, "Unable to create new user!");
            }
        } catch (error) {
            createError(res, 400, error.message);
        }
    }

    async signIn(req, res) {
        try {
            const { username, password } = req.body;
            const user = await userService.validateUser(username, password);
            if (user) {
                createResponse(res, 200, "Login successful!", user, 200);
            } else {
                createError(res, 400, "Invalid credentials!");
            }
        } catch (error) {
            createError(res, 400, error.message);
        }
    }
}

const authController = new AuthController();
module.exports = authController;
