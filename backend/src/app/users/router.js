const router = require("express").Router();
const { authenticateUser } = require("@/middlewares/auth");

const getCurrentUser = require("./controllers/getCurrentUser");
router.get("/me", authenticateUser, getCurrentUser);

module.exports = router;
