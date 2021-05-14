const router = require("express").Router();
const publicControllers = require("../controllers/public.controllers");

router.get("/", publicControllers.getLandingPage);

module.exports = router;
