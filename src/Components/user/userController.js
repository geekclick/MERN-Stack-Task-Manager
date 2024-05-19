const { createError, createResponse, decodeToken } = require("../../Helpers");
const userService = require("./userService");

class UserController {

    async profile(req, res) {
        try {
            let token = decodeToken(req.headers);
            const user = await userService.profile(token?._id);
            if (user) {
                // return res.json(user._doc);
                return createResponse(res, 200, "User found!", user._doc, 200);
            } else {
                return createError(res, 400, "Invalid credentials!");
            }
        } catch (e) {
            return createError(res, 400, e.message);
        }
    }

    async updateProfile(req, res) {
        try {
            let token = decodeToken(req.headers);
            const user = await userService.updateProfile(req, token?.id);
            if (user) {
                createResponse(res, 200, "Login Successfully!", user, 200);
            } else {
                createError(res, 400, "Invalid credentials!");
            }
        } catch (e) {
            createError(res, 400, e.message);
        }
    }

    async deleteUser(req, res) {
        try {
            let token = decodeToken(req.headers);
            const user = await userService.deleteUser(req, token?.id);
            if (user) {
                createResponse(res, 200, "Deleted user successfully!", user, 200);
            } else {
                createError(res, 400, "Invalid credentials!");
            }
        } catch (e) {
            createError(res, 400, e.message);
        }
    }
}

const userController = new UserController();
module.exports = userController;
