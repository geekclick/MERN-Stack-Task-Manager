const User = require("../../Models/user-model")


class UserService {

    async validateUser(username, password) {
        const user = await User.findOne({ username });
        if (user) {
            const isAuthorizedUser = await user.authenticateUser(password)
            if (isAuthorizedUser) return user.toAuthJSON()
        } else return null
    }

    async addNewUser(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                let { email } = req.body
                email = String(email).toLowerCase()
                const user = await User.findOne({ email: email })

                if (user) {
                    reject({ message: "That email is already in use!" })
                } else {
                    const new_user = new User(req.body)
                    await new_user.save()
                    if (new_user) {
                        resolve(new_user.toAuthJSON())
                    } else {
                        await new_user.remove();
                        reject({ message: "Unable to create a new user!" })
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    }

}

const userService = new UserService()
module.exports = userService