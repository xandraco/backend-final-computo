const express = require('express');
const router = express.Router();

// controladores
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('./../controller/userController');
const { createPatient, getPatient, updatePatient, deletePatient, getAllPatients } = require('./../controller/patientController');
const authenticateToken = require('./../auth/authMiddleware');

// usuarios
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.delete('/delete-user/:email', authenticateToken, deleteUser);
router.put('/users/:email', authenticateToken, updateUser);

// pacientes
router.post('/create-patient', authenticateToken, createPatient);
router.get('/get-patient/:email', authenticateToken, getPatient);
router.put('/update-patient/:email', authenticateToken, updatePatient);
router.delete('/delete-patient/:email', authenticateToken, deletePatient);
router.get('/get-all-patient', authenticateToken, getAllPatients);

module.exports = router;
