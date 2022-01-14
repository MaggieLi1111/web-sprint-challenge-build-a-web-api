// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const {
    validateProjectId,
    validateProject,
} = require("./projects-middleware.js");

const Projects = require("./projects-model.js");



router.get("/", (req, res) => {
    Projects.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                return [];
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "error on getting projects",
                err: err.message,
                stack: err.stack
            })
        })
})

router.get("/:id", validateProjectId, (req, res, next) => {
    Projects.get(req.params.id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.post("/", validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert({
            ...req.body,
        })
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})


router.put("/:id", validateProjectId, validateProject, async (req, res, next) => {
    try {
        const updated = await Projects.update(req.validId.id, req.body)
        res.status(200).json(updated)
    } catch (err) {
        next(err)
    }
})


router.delete("/:id", validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then((id) => {
            res.status(200).json({
                message: "The project has been deleted"
            })
        })
        .catch(next)
})


router.get("/:id/actions", validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (!actions) {
                res.status(400).json(actions)
            } else {
                res.status(200).json(actions)
            }
        })
        .catch(next)
})



module.exports = router;