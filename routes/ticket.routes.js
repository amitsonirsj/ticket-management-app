const { create, assign, updateStatus, getTickets } = require('../controllers/tikcet.controller');
const auth = require('../middlewares/auth.middleware');
const router = require("express").Router();

router.put('/assign', auth, assign);
router.put('/status', auth, updateStatus);
router.post('/', auth, create);
router.get('/', auth, getTickets);

module.exports = router;