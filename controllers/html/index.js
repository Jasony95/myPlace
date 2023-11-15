const router = require("express").Router();
// import all api route files here
const homeRoutes = require("./homeRoutes");


//add api routes to the router
router.use("/", homeRoutes);



module.exports = router;