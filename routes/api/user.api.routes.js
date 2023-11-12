const router = require("express").Router();
const Model = require("../../db/User");
const bcrypt = require('bcrypt');

// CREATE a new user. Need to specify route based on models
router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        // hash the password from 'req.body' and save to newUser
        newUser.password = await bcrypt.hash(req.body.password, 10);
        // create the newUser with the hashed password and save to DB
        const userData = await User.create(newUser);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all records
router.get("/", async (req, res) => {
    try {
        const payload = await Model.findAll();
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

//get one record by pk (primary key)
router.get("/:id", async (req, res) => {
    try {
        const payload = await Model.findByPk(req.params.id);
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

//create new record
router.post("/", async (req, res) => {
    try {
        const payload = await Model.create(req.body);
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

//update a record
router.put("/:id", async (req, res) => {
    try {
        const payload = await Model.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

//delete a record
router.delete("/:id", async (req, res) => {
    try {
        const payload = await Model.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

module.exports = router;