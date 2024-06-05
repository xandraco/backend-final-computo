const express = require('express');
const router = express.Router();

// controladores
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('./../controller/userController');
const { createPatient, getPatient, updatePatient, deletePatient, getAllPatients } = require('./../controller/patientController');
const { createAppointment, getAppointment, updateAppointment, deleteAppointment, getAllAppointments } = require('../controller/appointmentController');
const authenticateToken = require('./../auth/authMiddleware');

// usuarios
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.delete('/delete-user/:email', authenticateToken, deleteUser);
router.put('/users/:email', authenticateToken, updateUser);

// pacientes
router.post('/patient/create', authenticateToken, createPatient);
router.get('/patient/get/:email', authenticateToken, getPatient);
router.put('/patient/update/:email', authenticateToken, updatePatient);
router.delete('/patient/delete/:email', authenticateToken, deletePatient);
router.get('/patient/get/all', authenticateToken, getAllPatients);

// citas
router.post('/appointment/create', authenticateToken, createAppointment);
router.get('/appointment/get/:id', authenticateToken, getAppointment);
router.put('/appointment/update/:id', authenticateToken, updateAppointment);
router.delete('/appointment/delete/:id', authenticateToken, deleteAppointment);
router.get('/appointment/get-all', authenticateToken, getAllAppointments);

module.exports = router;
