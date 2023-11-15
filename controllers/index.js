const router = require("express").Router();

// router.use("*", (req, res) => {
//   console.log("ok")
//   res.json({ status: "ok" })
// })

// import all api route files here
const apiRoutes = require("./api");
//import all html route files here
const htmlRoutes = require("./html");


// Add html routes to the router
router.use("/", htmlRoutes);

//add api routes to the router
router.use("/api", apiRoutes);

module.exports = router;