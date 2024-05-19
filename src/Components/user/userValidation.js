const { createValidationResponse } = require("../../Helpers")

class UserValidation {

    async user(req, res, next) {
        const errors = {}
        let authorization = req.headers['authorization']?.split(" ")

        if (!authorization) {
            errors.token = "Unauthorized user"
        }
        if (authorization?.[0] !== "Bearer") {
            errors.token = "Invalid Request"
        }
        if (Object.keys(errors)?.length > 0) {
            createValidationResponse(res, errors)
        } else {
            next();
        }
    }
}

const userValidation = new UserValidation();
module.exports = userValidation;