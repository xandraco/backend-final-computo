const Appointment = require('../models/appointmentModel');

const createAppointment = async (req, res) => {
    const userEmail = req.user.email;
    const { date, time, patientEmail } = req.body;
    
    try {
        const newAppointment = await Appointment.createAppointment(userEmail, date, time, patientEmail);
        res.status(201).json({
            message: 'Appointment created successfully',
            appointment: newAppointment
        });
    } catch (error) {
        if (error.message === 'Appointment already exists for the given date and time') {
            res.status(400).json({
                message: 'Appointment already exists for the given date and time'
            });
        } else {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
};

const getAppointment = async (req, res) => {
    const userEmail = req.user.email;
    const appointmentId = req.params.id;
    try {
        const appointment = await Appointment.getAppointment(userEmail, appointmentId);
        if (appointment) {
            res.status(200).json({
                message: 'success',
                appointment
            });
        } else {
            res.status(404).json({
                message: 'Appointment not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const updateAppointment = async (req, res) => {
    const userEmail = req.user.email;
    const appointmentId = req.params.id;
    const { date, time, patientEmail } = req.body;
    const appointmentData = { date, time, patientEmail };

    try {
        const updatedAppointment = await Appointment.updateAppointment(userEmail, appointmentId, appointmentData);
        res.status(200).json({
            message: 'Appointment updated successfully',
            appointment: updatedAppointment
        });
    } catch (error) {
        if (error.message === 'Appointment already exists for the given date and time') {
            res.status(400).json({
                message: 'Appointment already exists for the given date and time'
            });
        } else {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
};

const deleteAppointment = async (req, res) => {
    const userEmail = req.user.email;
    const appointmentId = req.params.id;
    try {
        await Appointment.deleteAppointment(userEmail, appointmentId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const getAllAppointments = async (req, res) => {
    const userEmail = req.user.email;
    try {
        const appointments = await Appointment.getAllAppointments(userEmail);
        res.status(200).json({
            message: 'success',
            appointments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = { createAppointment, getAppointment, updateAppointment, deleteAppointment, getAllAppointments };
