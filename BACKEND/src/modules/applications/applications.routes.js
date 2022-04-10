const router = require('express').Router();
const applicationController = require('./application.controller');

/**
 * @swagger
 *   /api/applications:
 *     get:
 *       tags:
 *       - Applications
 *       description: Get all rescuers
 *       responses: 
 *         200:
 *           description: Array with a list of applications
 */
router.get('/', applicationController.getAll);
/**
 * @swagger
 *   /api/applications/{id}:
 *     get:
 *       tags:
 *       - Applications
 *       description: Get application by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The application's unique ID
 *       responses: 
 *         200:
 *           description: application with the unique ID
 */
router.get('/:id', applicationController.getById);
/**
 * @swagger
 *   /api/applications:
 *     post:
 *       tags:
 *       - Applications
 *       description: JSON with the information of the application to create
 *       consumes:
 *         application/json
 *       parameters:
 *         - in: body
 *           name: application
 *           required: true
 *           description: The application to create
 *           schema:
 *             type: object
 *       responses: 
 *         200:
 *           description: application was created succesfully
 */
router.post('/', applicationController.create);
/**
 * @swagger
 *   /api/applications/{id}:
 *     put:
 *       tags:
 *       - Applications
 *       description: Update application by ID
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The application's unique ID
 *         - in: body
 *           name: user
 *           required: true
 *           description: The application info to update
 *           schema:
 *             type: object
 * 
 *       responses: 
 *         200:
 *           description: application with the unique ID
 */
router.put('/:id', applicationController.update);
/**
 * @swagger
 *   /api/applications/{id}:
 *     delete:
 *       tags:
 *       - Applications
 *       description: Delete application by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The application's unique ID
 *       responses: 
 *         200:
 *           description: application deleted with the unique ID
 */
router.delete('/:id', applicationController.delete);

module.exports = router;