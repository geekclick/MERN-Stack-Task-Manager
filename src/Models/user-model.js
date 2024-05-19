const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    // peers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // notifications: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // },
});

// Hashing a password using Bcryptjs 
userSchema.pre("save", function (next) {
    if (this.isModified('password')) {
        this.extra1 = this.password; // this can be insecure to save password in db try to remove this line
        this.password = this._hashpassword(this.extra1)
        return next()
    }
    return next()
})


userSchema.methods = {
    authenticateUser(password) {
        return bcrypt.compareSync(password, this.password)
    },

    _hashpassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    },

    createToken() {
        return jwt.sign({
            _id: this._id,
            email: this.email
        },
            process.env.JWT_KEY,
            { expiresIn: '3h' }
        )
    },

    toAuthJSON() {
        return {
            _id: this._id,
            email: this.email,
            token: `${this.createToken()}`
        }
    },

    toJSON() {
        return {
            _id: this._id,
            email: this.email,
            token: this.token
        }
    }
}


const User = new mongoose.model("User", userSchema);
module.exports = User;