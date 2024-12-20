
// userRouts.js
const express=require('express');
const {registerUser}=require('../controllers/userControllers');
const {authUser}=require('../controllers/userControllers');
const {allUsers}=require('../controllers/userControllers')
const {protect}=require('../middlewere/authMiddlewere');
const {reportUser}=require('../controllers/userControllers');
const router=express.Router();

router.route('/').post(registerUser).get(protect,allUsers);;
router.post('/login',authUser);
router.post('/report',reportUser);
// router
module.exports=router;