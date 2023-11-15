const router = require("express").Router();
// import all api route files here
const userRoutes = require("./user");


//add api routes to the router
router.use("/user", userRoutes);



module.exports = router;