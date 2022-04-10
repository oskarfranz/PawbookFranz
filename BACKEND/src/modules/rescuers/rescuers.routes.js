const router = require('express').Router();
const rescuerController = require('./rescuer.controller');
/**
 * @swagger
 *   /api/rescuers:
 *     get:
 *       tags:
 *       - Rescuers
 *       description: Get all rescuers
 *       responses: 
 *         200:
 *           description: Array with a list of rescuers
 */
router.get('/', rescuerController.getAll);
/**
 * @swagger
 *   /api/rescuers/{id}:
 *     get:
 *       tags:
 *       - Rescuers
 *       description: Get rescuer by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The rescuer's unique ID
 *       responses: 
 *         200:
 *           description: Rescuer with the unique ID
 */
router.get('/:id', rescuerController.getById);
/**
 * @swagger
 *   /api/rescuers:
 *     post:
 *       tags:
 *       - Rescuers
 *       description: JSON with the information of the rescuer to create
 *       consumes:
 *         application/json
 *       parameters:
 *         - in: body
 *           name: pet
 *           required: true
 *           description: The rescuer to create
 *           schema:
 *             type: object
 *       responses: 
 *         200:
 *           description: Rescuer was created succesfully
 */
router.post('/', rescuerController.create);
/**
 * @swagger
 *   /api/rescuers/{id}:
 *     put:
 *       tags:
 *       - Rescuers
 *       description: Update rescuer by ID
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The rescuers's unique ID
 *         - in: body
 *           name: user
 *           required: true
 *           description: The rescuer info to update
 *           schema:
 *             type: object
 * 
 *       responses: 
 *         200:
 *           description: Rescuers with the unique ID
 */
router.put('/:id', rescuerController.update);
/**
 * @swagger
 *   /api/rescuers/{id}:
 *     delete:
 *       tags:
 *       - Rescuers
 *       description: Delete rescuer by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The rescuer's unique ID
 *       responses: 
 *         200:
 *           description: Rescuer deleted with the unique ID
 */
router.delete('/:id', rescuerController.delete);

module.exports = router;