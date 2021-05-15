/**
 * @author Azad Mamun
 * @description This file contains all public routes, need no authentication or registration
 * @access public
 */

const router = require("express").Router();
const publicControllers = require("../controllers/public.controllers");

/**
 * @description get landing page
 * @route /
 */
router.get("/", publicControllers.getLandingPage);

module.exports = router;
