const Project = require("../../Models/project-model")
const User = require("../../Models/user-model")

class ProjectService {

    async addProject(payload) {
        const user = await User.findById(payload.user_id)
        if (user) {
            const project = await new Project({ ...payload, owner: user._id })
            console.log(project)
            await project.save()
            console.log(project)

            user.projects.push(project)
            await user.save()

            if (project) {
                return project
            } else return null;
        } else return null
    }

    async projectList() {
        const projectList = await Project.find();
        if (projectList) {
            return projectList
        } else return null
    }

    async updateProject(id) {
        console.log(id)
        const project = await Project.findOne({ _id: id })
        if (project) {
            const updated = {
                name: project?.name,
                id: project?._id,
                ...data
            }
            const res = await Project.updateOne({ ...updated })
            if (res) {
                return updated
            } else return null
        } else return null
    }

    async deleteProject(id) {
        const project = await Project.findOne({ _id: id });
        if (project) {
            const res = await Project.deleteOne({ _id: project?._id });
            if (res) return {};
            else return null;
        } else return null;
    }

    async singleProject(id) {
        const project = await Project.findOne({ _id: id });
        if (project) return project;
        else return null;
    }
}

const projectService = new ProjectService();
module.exports = projectService;
