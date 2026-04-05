const router = require('express').Router();
const { createRequirement, getRequirements } = require('../controllers/requirementController');

router.post('/', createRequirement);
router.get('/', getRequirements);

module.exports = router;