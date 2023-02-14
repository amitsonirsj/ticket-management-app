const { create } = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');
const router = require("express").Router();

router.post('/', auth, create);

module.exports = router;