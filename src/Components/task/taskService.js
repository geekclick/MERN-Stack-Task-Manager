const Task = require("../../Models/task-model")
const User = require("../../Models/user-model")
const Project = require("../../Models/project-model")

class TaskService {

    async addTask(payload) {
        const user = await User.findById(payload.user_id)
        payload.assigned_to.push(user._id)
        if (user) {
            const project = await Project.findById(payload.project)
            if (project) {
                const task = await new Task({ ...payload })
                await task.save()

                project.related_tasks.push(task)
                await project.save()

                if (task) {
                    return task
                } else return null
            } else return null
        } else return null
    }

    async taskList(token) {
        const task = await Task.find();
        if (task) {
            const userTasks = task.filter((t) => t.assigned_to[0] == token._id);
            return userTasks;
        } else return null
    }

    async singleTask(id) {
        const task = await Task.findById(id)
        if (task) {
            return task
        } else return null
    }

    async updateTask(body) {
        const task = await Task.findOne({ _id: body._id })
        if (task) {
            const updated = {
                title: body.title,
                description: body.description,
                tags: body.tags,
                task_status: body.task_status,
                assigned_to: body.assigned_to,
                project: body.project
            }
            const res = await Task.updateOne({ _id: body._id }, updated)
            if (res) {
                return updated
            } else return null
        } else return null
    }

    async deleteTask(id) {
        const task = await Task.findOne({ _id: id });
        if (task) {
            const res = await Task.deleteOne({ _id: task?._id });
            if (res) return {};
            else return null;
        } else return null;
    }

    async searchTask(payload) {
        const regex = new RegExp(payload.query, 'i');
        const task = await Task.find({ title: { $regex: regex } })
        if (task) {
            const userTasks = task.filter((t) => t.assigned_to[0] == payload._id)
            return userTasks
        } else null
    }
}

const taskService = new TaskService();
module.exports = taskService