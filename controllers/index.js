// server looks here to get routes
// two categories of routes:
//  -- homeRoutes are the routes to desplay the views
//     -- will look like http://localhost:3001/
//  -- api routes are the routes that interact with database (adding new reservation etc)
//     -- will look like http://localhost:3001/api


const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoute = require("./homeRoutes");

router.use("/", homeRoute);
router.use("/api", apiRoutes);

module.exports = router;