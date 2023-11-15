const router = require("express").Router();
const { User, Marker } = require("../../models")

const bcrypt = require('bcrypt');
// const { User, Place, Comment, Category } = require('../../models');

// CREATE a new user. Need to specify route based on models
router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        // hash the password from 'req.body' and save to newUser
        newUser.password = await bcrypt.hash(req.body.password, 10);
        // create the newUser with the hashed password and save to DB
        console.log(newUser);
        const userData = await User.create(newUser);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    console.log("login")
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        console.log(dbUserData)

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        console.log(req.body.password)

        const validPassword = (req.body.password = dbUserData.password)
        // const validPassword = await dbUserData.checkPassword(req.body.password);

        console.log("pw", validPassword)

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id
            console.log("session", req.session)
            console.log(
                'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
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


// get all records
router.get("/", async (req, res) => {
    try {
        const payload = (await User.findAll()).include({ model: Marker });
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

router.get("/map", async (req, res) => {
    console.log(req.session.user_id)
    try {
        const payload = await User.findByPk(req.session.user_id, { include: { model: Marker } });
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

router.put("/location", async (req, res) => {
    try {
        const payload = await User.update(
            {
                location: req.body.location
            },
            {
                where: {
                    id: req.session.user_id
                }

            }
        )
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})

//get one record by pk (primary key)
router.get("/:id", async (req, res) => {
    try {
        const payload = await User.findByPk(req.params.id).include({ model: Marker });
        res.status(200).json({ status: "success", payload })
    } catch (err) {
        res.status(500).json({ status: "error", payload: err.message })
    }
})







//update a record
router.put("/:id", async (req, res) => {
    try {
        const payload = await User.update(
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
        const payload = await User.destroy({
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