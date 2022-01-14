// add middlewares here related to projects
const Projects = require("./projects-model.js")

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            next({
                status:404,
                message:"The project with the specified ID does not exist"
            })
        } else {
            req.validId = project
            next()
        }
    } catch (err) {
        next(err)
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !name.trim()) {
        res.status(400).json({
            message: "missing required name filed"
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: "missing required description filed"
        })
    } else if (completed === undefined) {
        res.status(400).json({
            message: "missing required completed filed"
        })
    } else {
        req.name = name.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject,
};