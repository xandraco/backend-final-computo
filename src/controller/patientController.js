// controller/patientController.js
const Patient = require('../models/patientModel');

const createPatient = async (req, res) => {
    const userEmail = req.user.email;
    const { fullName, age, sex, phoneNumber, email, address } = req.body;
    const patientData = { fullName, age, sex, phoneNumber, email, address };
    
    try {
        const newPatient = await Patient.createPatient(userEmail, patientData);
        res.status(201).json({
            message: 'Patient created successfully',
            patient: newPatient
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const getPatient = async (req, res) => {
    const userEmail = req.user.email;
    const patientEmail = req.params.email;
    try {
        const patient = await Patient.getPatient(userEmail, patientEmail);
        if (patient) {
            res.status(200).json({
                message: 'success',
                patient
            });
        } else {
            res.status(404).json({
                message: 'Patient not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const updatePatient = async (req, res) => {
    const userEmail = req.user.email;
    const patientEmail = req.params.email;
    const { fullName, age, sex, phoneNumber, email, address } = req.body;
    const patientData = { fullName, age, sex, phoneNumber, email, address };

    try {
        const updatedPatient = await Patient.updatePatient(userEmail, patientEmail, patientData);
        res.status(200).json({
            message: 'Patient updated successfully',
            patient: updatedPatient
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const deletePatient = async (req, res) => {
    const userEmail = req.user.email;
    const patientEmail = req.params.email;
    try {
        await Patient.deletePatient(userEmail, patientEmail);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const getAllPatients = async (req, res) => {
    const userEmail = req.user.email;
    try {
        const patients = await Patient.getAllPatients(userEmail);
        res.status(200).json({
            message: 'success',
            patients
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = { createPatient, getPatient, updatePatient, deletePatient, getAllPatients };
