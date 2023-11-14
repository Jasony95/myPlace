const router = require("express").Router();
const Model = require("../../db/User");
const bcrypt = require('bcrypt');
const { User, Place, Comment, Category } = require('../../models');

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

const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            console.log(
                'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// added this note for testing purposes only

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