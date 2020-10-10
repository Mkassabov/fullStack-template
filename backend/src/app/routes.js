const router = require("express").Router();
const cors = require("cors");

router.use(cors());

const userRouter = require("./users/router");
router.use("/users", userRouter);

module.exports = router;
