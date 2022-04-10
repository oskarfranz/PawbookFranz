const router = require('express').Router();
const adopterController = require('./adopter.controller');
/**
 * @swagger
 *   /api/adopters:
 *     get:
 *       tags:
 *       - Adopters
 *       description: Get all rescuers
 *       responses: 
 *         200:
 *           description: Array with a list of adopters
 */
router.get('/', adopterController.getAll);
/**
 * @swagger
 *   /api/adopters/{id}:
 *     get:
 *       tags:
 *       - Adopters
 *       description: Get adopter by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The adopter's unique ID
 *       responses: 
 *         200:
 *           description: adopter with the unique ID
 */
router.get('/:id', adopterController.getById);
/**
 * @swagger
 *   /api/adopters:
 *     post:
 *       tags:
 *       - Adopters
 *       description: JSON with the information of the adopter to create
 *       consumes:
 *         adopter/json
 *       parameters:
 *         - in: body
 *           name: adopter
 *           required: true
 *           description: The adopter to create
 *           schema:
 *             type: object
 *       responses: 
 *         200:
 *           description: adopter was created succesfully
 */
router.post('/', adopterController.create);
/**
 * @swagger
 *   /api/adopters/{id}:
 *     put:
 *       tags:
 *       - Adopters
 *       description: Update adopter by ID
 *       consumes:
 *         - adopter/json
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The adopter's unique ID
 *         - in: body
 *           name: user
 *           required: true
 *           description: The adopter info to update
 *           schema:
 *             type: object
 * 
 *       responses: 
 *         200:
 *           description: adopter with the unique ID
 */
router.put('/:id', adopterController.update);
/**
 * @swagger
 *   /api/adopters/{id}:
 *     delete:
 *       tags:
 *       - Adopters
 *       description: Delete adopter by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The adopter's unique ID
 *       responses: 
 *         200:
 *           description: adopter deleted with the unique ID
 */
router.delete('/:id', adopterController.delete);

module.exports = router;