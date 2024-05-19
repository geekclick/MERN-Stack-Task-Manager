const express = require('express');
const router = express.Router();
const projectController = require('./projectController');
const userValidations = require("../user/userValidation")

router.get("/", userValidations.user, (req, res) => {
    projectController.projectList(req, res)
})

router.post("/", userValidations.user, (req, res) => {
    projectController.addProject(req, res)
})

router.get("/:project_id", userValidations.user, (req, res) => {
    projectController.singleProject(req, res)
})

router.put("/:project_id", userValidations.user, (req, res) => {
    projectController.updateProject(req, res)
})

router.delete("/:project_id", userValidations.user, (req, res) => {
    projectController.deleteProject(req, res)
})

module.exports = router 