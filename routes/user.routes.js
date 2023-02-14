const { login, signup, userList } = require("../controllers/user.controller");
const auth = require('../middlewares/auth.middleware');
const router = require("express").Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/', auth, userList);

module.exports = router;