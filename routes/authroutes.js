const express = require('express');
const router = express.Router();
const AuthControl = require('../controllers/authcontrol');
const jwtMiddleware = require('../middleware/authmiddleware')
const Control = new AuthControl();

const middleware = new jwtMiddleware();

router.post('/signup', Control.signUp);

router.post('/signin', Control.signIn);

router.post('/addUser', Control.addUser);

router.post('/fetch', Control.fetchAllUser);

router.delete('/delete/:email', Control.deleteUser);

router.get('/filter/:userId', Control.filterUsers);

router.get('/count', Control.getUserCount);

router.get('/active/count', Control.getActiveUsersCount);


router.patch('/update/:id',middleware.verifyToken ,Control.UpdateUser);

// router.get('/checkEmail/:email', Control.checkEmail);

router.get('/getId', Control.findById);

router.put('/modify/:id',middleware.verifyToken ,Control.UpdateUser);

router.patch('/verify',Control.verifyEmail);

module.exports = router;