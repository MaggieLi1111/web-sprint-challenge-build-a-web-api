// add middlewares here related to projects
const Projects = require("./projects-model.js")

async function validateProjectId (req, res, next)  {
try {
    const project = await Projects.getById(req.params.id)
    if(project) {
        req.poject = project;
        next();
    } else {
        next({
            status:404,
            message:"The project with the specified ID does not exist"
        })
    }
} catch(err) {
    next(err)
}
}

function validateProject (req, res, next) {
    const { name, description, completed } = req.body;
    if(!name || !name.trim()) {
        res.status(400).json({
            message:"missing required name filed"
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message:"missing require description filed"
        })
    } else {
        req.name = name.trim();
        req.description = name.trim();
        req.completed = completed;
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject,
};