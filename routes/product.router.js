const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.ctrl');

router.get('/', productCtrl.get);
router.get('/new', productCtrl.new);
router.get('/:id', productCtrl.getById);
router.post('/remove/:id', productCtrl.remove);
router.post('/', productCtrl.save);


module.exports = router;