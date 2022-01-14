// add middlewares here related to actions
const Actions = require("./actions-model");


async function validateActionId (req, res, next) {
    try {
        const actions = await Actions.get(req.params.id)
        if(!actions) {
            next({
                status:404,
                message:"There is no action with the given id"
            })
        } else {
            req.actions = actions
            next()
        }
    } catch (err) {
        res.status(500).json({
            message:"Problem finding actions"
        })
    }
}


 const validateAction = (req, res, next) => {
    const { notes, description, project_id } = req.body;
    if( !notes || !description || !project_id) {
        res.status(400).json({
            message:"missing required fileds"
        })
    } else {
        next()
    } 
}


const validatePost = (req, res, next) => {
    const { notes, description, project_id } = req.body;
    if( !notes || !description || !project_id) {
        res.status(400).json({
            message:"missing required fileds"
        })
    } else {
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction,
    validatePost,
}