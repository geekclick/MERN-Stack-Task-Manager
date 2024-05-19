const { decodeToken, createResponse, createError } = require('../../Helpers');
const taskService = require("./taskService")

class TaskController {

    async taskList(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const task = await taskService.taskList(token);
                if (task) {
                    return createResponse(res, 200, "Got task list!", task, 200)
                } else {
                    return createError(res, 400, "Unable to get task list")
                }
            } else {
                return createError(res, 400, "Unauthorized user")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async addTask(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const task = await taskService.addTask({
                    ...req.body,
                    user_id: token?._id
                })
                if (task) {
                    return createResponse(res, 200, "New task is created", task, 200)
                } else {
                    return createError(res, 400, "Unable to create task")
                }
            } else {
                return createError(res, 400, "Unauthorized user!")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async updateTask(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const task = await taskService.updateTask(req.body)
                if (task) {
                    return createResponse(res, 200, "Updated task details", 200)
                } else {
                    return createError(res, 400, "Unable to update task")
                }
            } else {
                return createError(res, 400, "Unauthorized user!")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async deleteTask(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const task = await taskService.deleteTask(req.params.taskId)
                if (task) {
                    return createResponse(res, 200, "Task is deleted", 200)
                } else {
                    return createError(res, 400, "Unable to delete task")
                }
            } else {
                return createError(res, 400, "Unauthorized user!")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async singleTask(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const task = await taskService.singleTask(req.params.taskId)
                if (task) {
                    return createResponse(res, 200, "Task found", task, 200)
                } else {
                    return createError(res, 400, "Unable to get task")
                }
            } else {
                return createError(res, 400, "Unauthorized user!")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async searchTask(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const task = await taskService.searchTask({
                    _id: token._id,
                    query: req.query.q
                })
                if (task) {
                    return createResponse(res, 200, "Task found", task, 200)
                } else {
                    return createError(res, 400, "Unable to get task")
                }
            } else {
                return createError(res, 400, "Unauthorized user!")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

}

const taskController = new TaskController()
module.exports = taskController