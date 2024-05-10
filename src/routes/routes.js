const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('./../controller/userController');
const authenticateToken = require('./../auth/authMiddleware');

router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.delete('/delete-user/:email', authenticateToken, deleteUser);
router.put('/users/:email', authenticateToken, updateUser);

module.exports = router;
