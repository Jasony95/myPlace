const router = require("express").Router();

// router.use("*", (req, res) => {
//   console.log("ok")
//   res.json({ status: "ok" })
// })

// import all api route files here
const userApiRoutes = require("./api/user.api.routes");
const markerApiRoutes = require("./api/marker.api.routes");

//import all html route files here
const userHtmlRoutes = require("./html/user.html.routes");

//add api routes to the router
router.use("/api/user", userApiRoutes);
router.use("/api/marker", markerApiRoutes);


// Add html routes to the router
router.use("/user", userHtmlRoutes);



module.exports = router