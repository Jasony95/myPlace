const router = require("express").Router();
const { User } = require("../../models")

router.get("/", async (req, res) => {
    let loggedInUser = null
    if( req.session.user_id ){
        loggedInUser = await User.findByPk(req.session.user_id)
    }

    console.log("loc", loggedInUser?.location)
    res.render("home", {
        loggedIn: req.session.loggedIn,
        location: loggedInUser?.location || null
    });
})

router.get("/login", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("login", options)
})

router.get("/signup", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("signup", options)
})

router.get("/userpage", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("userpage", options)
})

router.get("/home", (req, res) => {
    const options = { isLoggedIn: req.session?.loggedIn }
    res.render("home", options)
})

module.exports = router;