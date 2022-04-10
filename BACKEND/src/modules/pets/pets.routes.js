const router = require('express').Router();
const petController = require('./pet.controller');

/**
 * @swagger
 *   /api/pets:
 *     get:
 *       tags:
 *       - Pets
 *       description: Get all rescuers
 *       responses: 
 *         200:
 *           description: Array with a list of pets
 */
router.get('/', petController.getAll);
/**
 * @swagger
 *   /api/pets/{id}:
 *     get:
 *       tags:
 *       - Pets
 *       description: Get pet by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The pet's unique ID
 *       responses: 
 *         200:
 *           description: Pet with the unique ID
 */
router.get('/:id', petController.getById);
/**
 * @swagger
 *   /api/pets:
 *     post:
 *       tags:
 *       - Pets
 *       description: JSON with the information of the pet to create
 *       consumes:
 *         application/json
 *       parameters:
 *         - in: body
 *           name: pet
 *           required: true
 *           description: The pet to create
 *           schema:
 *             type: object
 *       responses: 
 *         200:
 *           description: Pet was created succesfully
 */
router.post('/', petController.create);
/**
 * @swagger
 *   /api/pets/{id}:
 *     put:
 *       tags:
 *       - Pets
 *       description: Update pet by ID
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The pet's unique ID
 *         - in: body
 *           name: user
 *           required: true
 *           description: The pet info to update
 *           schema:
 *             type: object
 * 
 *       responses: 
 *         200:
 *           description: Pet with the unique ID
 */
router.put('/:id', petController.update);
/**
 * @swagger
 *   /api/pets/{id}:
 *     delete:
 *       tags:
 *       - Pets
 *       description: Delete pet by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The pet's unique ID
 *       responses: 
 *         200:
 *           description: Pet deleted with the unique ID
 */
router.delete('/:id', petController.delete);

module.exports = router;