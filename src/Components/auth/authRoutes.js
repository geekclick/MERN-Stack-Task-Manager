const express = require('express');
const router = express.Router();
const authController = require('../auth/authController');
const validate = require('../../Middlewares/validate-middleware');
const { signupSchema, loginSchema } = require('./authValidations'); // Destructure schemas

router.get("/", (req, res) => {
    ("object")
    authController.home(req, res);
});

router.post("/login", validate(loginSchema), (req, res) => {
    authController.signIn(req, res);
});

router.post("/signup", validate(signupSchema), (req, res) => {
    authController.register(req, res);
});
module.exports = router;
