const express = require('express');
const { decodeToken, createResponse, createError } = require('../../Helpers')
const projectService = require("./projectService")


class ProjectController {

    async addProject(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const project = await projectService.addProject({
                    ...req.body,
                    user_id: token?._id
                });
                if (project) {
                    return createResponse(res, 200, "New Project created successfully", 200)
                } else {
                    return createError(res, 400, "Not able to create new project")
                }
            } else {
                return createError(res, 400, "Unauthorized user!")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async projectList(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const project = await projectService.projectList(token)
                if (project) {
                    return createResponse(res, 200, "Got Project List", project, 200)
                } else {
                    return createError(res, 400, "Unable to got project list")
                }
            } else {
                return createError(res, 400, "Unauthorized user")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async updateProject(req, res) {
        try {
            const token = decodeToken(req.headers)
            if (token) {
                const project = await projectService.updateProject(req.body)
                if (project) {
                    return createResponse(res, 200, "Project details updated", 200)
                } else {
                    return createError(res, 400, "Unable to update project details")
                }
            } else {
                return createError(res, 400, "Unauthorized user")
            }
        } catch (error) {
            return createError(res, 400, error.message)
        }
    }

    async deleteProject(req, res) {
        try {
            const token = decodeToken(req.headers);
            if (token) {
                const project = await projectService.deleteProject(
                    req.params.project_id
                );
                if (project) {
                    createResponse(
                        res,
                        200,
                        "Project deleted successfully!",
                        project,
                        200
                    );
                } else {
                    createError(res, 400, "Not able to find this project!");
                }
            } else {
                createError(res, 400, "Unauthorized user");
            }
        } catch (e) {
            createError(res, 400, e.message);
        }
    }

    async singleProject(req, res) {
        try {
            const token = decodeToken(req.headers);
            if (token) {
                const project = await projectService.singleProject(
                    req.params.project_id
                );
                if (project) {
                    createResponse(
                        res,
                        200,
                        "Got single project successfully!",
                        project,
                        200
                    );
                } else {
                    createError(res, 400, "Not able to get a project!");
                }
            } else {
                createError(res, 400, "Unauthorized user");
            }
        } catch (e) {
            createError(res, 400, e.message);
        }
    }
}


const projectController = new ProjectController()
module.exports = projectController