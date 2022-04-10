const router = require('express').Router();

const usersRoutes = require('./../modules/users/users.routes');
const rescuersRoutes = require('./../modules/rescuers/rescuers.routes');
const petsRoutes = require('./../modules/pets/pets.routes');
const applicationsRoutes = require('./../modules/applications/applications.routes');
const adoptersRoutes = require('./../modules/adopters/adopters.routes');
const adminsRoutes = require('./../modules/admins/admins.routes');
const loginRoutes = require('../modules/login/login.routes');


router.use('/users', usersRoutes);
router.use('/rescuers', rescuersRoutes);
router.use('/pets', petsRoutes);
router.use('/applications', applicationsRoutes);
router.use('/adopters', adoptersRoutes);
router.use('/admins', adminsRoutes);
router.use('/login', loginRoutes);


module.exports = router;