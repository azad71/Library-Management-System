const router = require("express").Router();

const authRoutes = require("../modules/auth/auth.routes");

router.use("/auth", authRoutes);

module.exports = router;
