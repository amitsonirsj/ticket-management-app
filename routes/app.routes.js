/** App routes  */

const router = require("express").Router();
const userRoutes = require("./user.routes");
const ticketRoutes = require("./ticket.routes");
const commentRoutes = require("./comment.routes");

/** API's parent route */
router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);
router.use("/comments", commentRoutes);

module.exports = router;