const User = require("../../Models/user-model");

class UserService {

    async profile(id) {
        const user = await User.findById(id).select({ password: 0, _id: 0, isAdmin: 0, __v: 0 });
        if (user) return user;
        else return null;
    }

    async updateProfile(req, id) {
        const user = await User.findOne({ _id: id });
        if (user) {
            const updated = {
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
                id: user?._id,
                ...req.body,
            };
            const res = await user.updateOne({ ...updated });
            if (res) return updated;
        } else return null;
    }

    async deleteUser(req, id) {
        const user = await User.findOne({ _id: id });
        if (user) {
            const res = await user.deleteOne();
            console.log("res", res);
            if (res) return {};
        } else return null;
    }
}

const userService = new UserService();
module.exports = userService;
