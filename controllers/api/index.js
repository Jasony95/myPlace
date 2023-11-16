const router = require("express").Router();
// import all api route files here
const userRoutes = require("./user");
const markerRoutes = require("./marker");


//add api routes to the router
router.use("/user", userRoutes);
router.use("/marker", markerRoutes);



module.exports = router;