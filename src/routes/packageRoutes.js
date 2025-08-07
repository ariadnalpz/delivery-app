const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, packageController.createPackage);
router.get('/delivery/:id', authMiddleware, packageController.getPackagesByDelivery);
router.put('/:id/status', authMiddleware, packageController.updatePackageStatus);

module.exports = router;