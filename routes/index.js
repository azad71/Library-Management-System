const router = require("express").Router();

// const adminRoutes = require("./admin.routes");
// const authRoutes = require("./auth.routes");
// const userRoutes = require("./users.routes");
// const bookRoutes = require("./books.routes");
const publicRoutes = require("./public.routes");

// router.use("/auth", authRoutes);
// router.use("/admin", adminRoutes);
// router.use("/user", userRoutes);
// router.use("/books", bookRoutes);
router.use(publicRoutes); // public routes will be served from root

module.exports = router;
