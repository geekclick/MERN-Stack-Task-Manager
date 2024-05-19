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

    async taskList() {
        const task = await Task.find()
        if (task) {
            return task
        } else return null
    }

    async singleTask(id) {
        const task = await Task.findById(id)
        if (task) {
            return task
        } else return null
    }

    async updateTask(body) {
        console.log(body)
        const task = await Task.findOne({ _id: body._id })
        if (task) {
            const updated = {
                title: body.title,
                description: body.description,
                tags: body.tags,
                task_status: body.task_status
            }
            const res = await Task.updateOne({ ...updated })
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

    async searchTask(query) {
        console.log(query)
        const regex = new RegExp(query, 'i');
        console.log(regex)
        const task = await Task.find({ title: { $regex: regex } })
        console.log(task)
        if (task) {
            return task
        } else null
    }
}

const taskService = new TaskService();
module.exports = taskService