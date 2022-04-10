const router = require('express').Router();
const loginController = require('./login.controller');

/**
 * @swagger
 *   /api/login:
 *     post:
 *       tags:
 *       - Login
 *       description: Login and verify session
 *       responses: 
 *         200:
 *           description: JWT token
 */
router.post('/', loginController.login);

module.exports = router;