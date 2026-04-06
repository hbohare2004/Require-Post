const express = require('express');
const { createRequirement, getRequirements } = require('../controllers/requirementController');

const router = express.Router();

router.post('/', createRequirement);
router.get('/', getRequirements);

module.exports = router;
