const express = require('express');
const router = express.Router();
const userController = require("../user/userController")
const userValidations = require("./userValidation")

router.get("/profile", userValidations.user, (req, res) => {
    userController.profile(req, res);
});

router.put("/update-profile", userValidations.user, (req, res) => {
    userController.updateProfile(req, res);
});

router.delete("/delete-user", userValidations.user, (req, res) => {
    userController.deleteUser(req, res);
});


// router.route('/').get(userController.getAllUsers);
// router.route('/users/:userId').put(userController.register);
// router.route('/users/:userId').delete(userController.register);
// router.route('/users/:userId/notifications').get(validate(signupSchema), authcontroller.register);
// router.route('/users/:userId/notifications').post(validate(signupSchema), authcontroller.register);
// router.route('/users/:userId/notifications/notificationId').put(validate(signupSchema), authcontroller.register);
// router.route('/users/:userId/notifications/notificationId').delete(validate(signupSchema), authcontroller.register);

module.exports = router;