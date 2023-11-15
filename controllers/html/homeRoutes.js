const router = require("express").Router();

router.get("/", (req, res) => {
    console.log(req.session.loggedIn)
    res.render("home", {
        loggedIn: req.session.loggedIn
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