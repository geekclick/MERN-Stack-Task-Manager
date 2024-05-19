const express = require('express');
const router = express.Router();
const taskController = require('./taskController');
const userValidation = require("../user/userValidation")

router.get("/", userValidation.user, (req, res) => {
    taskController.taskList(req, res)
})

router.post("/", userValidation.user, (req, res) => {
    taskController.addTask(req, res)
})

router.get("/task/:taskId", userValidation.user, (req, res) => {
    taskController.singleTask(req, res)
})

router.get("/search", userValidation.user, (req, res) => {
    taskController.searchTask(req, res)
})

router.put("/", userValidation.user, (req, res) => {
    taskController.updateTask(req, res)
})

router.delete("/:taskId", userValidation.user, (req, res) => {
    taskController.deleteTask(req, res)
})


// router.route('/').get(taskController.getAllTasks);
// router.route('/').post(taskController.addTask);
// router.route('/:taskId').get(taskController.getTaskById);
// router.route('/:taskId').put(taskController.updateSelectedTask);
// router.route('/:taskId').delete(taskController.deleteSelectedTask);

module.exports = router;