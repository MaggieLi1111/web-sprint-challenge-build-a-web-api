// Write your "actions" router here!
const express = require("express")


const {
    validateActionId,
    validateAction,
    validatePost,
} = require("./actions-middlware")

const Actions = require("./actions-model")

const router = express.Router()

router.get("/", (req, res, next) =>{
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get("/:id", validateActionId, (req, res) => {
    console.log(req.actions)
    res.json(req.actions)
})


router.post("/", validateAction, (req, res, next) =>{
    Actions.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put("/:id", validateActionId, validateAction, (req, res, next) => {   
    Actions.update(req.params.id, req.body)
    .then( () => {
        return Actions.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
} )

router.delete("/:id", validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id) 
        res.status(200).json(req.actions)
    } catch(err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage:"something tragic inside actions router happened",
        errorMessage:err.message,
        stack:err.stack
    })
})

module.exports = router;