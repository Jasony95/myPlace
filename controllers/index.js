const router = require("express").Router();

// router.use("*", (req, res) => {
//   console.log("ok")
//   res.json({ status: "ok" })
// })

// import all api route files here
const apiRoutes = require("./api");
//import all html route files here
// const htmlRoutes = require("./html");
const homeRoutes = require("./html/homeRoutes");


// Add html routes to the router
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

//add api routes to the router

module.exports = router;