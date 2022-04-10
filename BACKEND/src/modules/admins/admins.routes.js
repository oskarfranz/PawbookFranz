const router = require('express').Router();
const adminController = require('./admin.controller');
/**
 * @swagger
 *   /api/admins:
 *     get:
 *       tags:
 *       - Admins
 *       description: Get all rescuers
 *       responses: 
 *         200:
 *           description: Array with a list of admins
 */
router.get('/', adminController.getAll);
/**
 * @swagger
 *   /api/admins/{id}:
 *     get:
 *       tags:
 *       - Admins
 *       description: Get admin by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The admin's unique ID
 *       responses: 
 *         200:
 *           description: admin with the unique ID
 */
router.get('/:id', adminController.getById);
/**
 * @swagger
 *   /api/admins:
 *     post:
 *       tags:
 *       - Admins
 *       description: JSON with the information of the admin to create
 *       consumes:
 *         admin/json
 *       parameters:
 *         - in: body
 *           name: admin
 *           required: true
 *           description: The admin to create
 *           schema:
 *             type: object
 *       responses: 
 *         200:
 *           description: admin was created succesfully
 */
router.post('/', adminController.create);
/**
 * @swagger
 *   /api/admins/{id}:
 *     put:
 *       tags:
 *       - Admins
 *       description: Update admin by ID
 *       consumes:
 *         - admin/json
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The admin's unique ID
 *         - in: body
 *           name: user
 *           required: true
 *           description: The admin info to update
 *           schema:
 *             type: object
 * 
 *       responses: 
 *         200:
 *           description: admin with the unique ID
 */
router.put('/:id', adminController.update);
/**
 * @swagger
 *   /api/admins/{id}:
 *     delete:
 *       tags:
 *       - Admins
 *       description: Delete admin by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The admin's unique ID
 *       responses: 
 *         200:
 *           description: admin deleted with the unique ID
 */
router.delete('/:id', adminController.delete);

module.exports = router;