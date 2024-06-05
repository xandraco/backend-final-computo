const admin = require('../config/firebase');
const appointmentInterface = require('../interfaces/appointmentInterface');
const firestore = admin.firestore();

class Appointment extends appointmentInterface {
    constructor(id, date, time, patientEmail) {
        super();
        this.id = id;
        this.date = date;
        this.time = time;
        this.patientEmail = patientEmail;
    }

    static async createAppointment(userEmail, date, time, patientEmail) {
        try {
            const existingAppointment = await this.findAppointmentByDateTime(userEmail, date, time);
            if (existingAppointment) {
                throw new Error('Appointment already exists for the given date and time');
            }
            const userRef = firestore.collection('users').doc(userEmail);
            const appointmentRef = userRef.collection('appointments').doc();
            const newAppointment = {
                date,
                time,
                patientEmail
            };
            await appointmentRef.set(newAppointment);
            return new Appointment(appointmentRef.id, date, time, patientEmail);
        } catch (error) {
            console.error('Error creating appointment: ', error);
            throw error;
        }
    }

    static async findAppointmentByDateTime(userEmail, date, time) {
        try {
            const userRef = firestore.collection('users').doc(userEmail);
            const appointmentsSnapshot = await userRef.collection('appointments')
                .where('date', '==', date)
                .where('time', '==', time)
                .get();
            if (!appointmentsSnapshot.empty) {
                const appointmentDoc = appointmentsSnapshot.docs[0];
                return new Appointment(appointmentDoc.id, appointmentDoc.data().date, appointmentDoc.data().time, appointmentDoc.data().patientEmail);
            }
            return null;
        } catch (error) {
            console.error('Error finding appointment by date and time: ', error);
            throw error;
        }
    }

    static async getAppointment(userEmail, appointmentId) {
        try {
            const appointmentRef = firestore.collection('users').doc(userEmail).collection('appointments').doc(appointmentId);
            const appointmentDoc = await appointmentRef.get();
            if (appointmentDoc.exists) {
                return new Appointment(appointmentDoc.id, appointmentDoc.data().date, appointmentDoc.data().time, appointmentDoc.data().patientEmail);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting appointment: ', error);
            throw error;
        }
    }

    static async updateAppointment(userEmail, appointmentId, appointmentData) {
        try {
            const existingAppointment = await this.findAppointmentByDateTime(userEmail, appointmentData.date, appointmentData.time);
            if (existingAppointment && existingAppointment.id !== appointmentId) {
                throw new Error('Appointment already exists for the given date and time');
            }
            const appointmentRef = firestore.collection('users').doc(userEmail).collection('appointments').doc(appointmentId);
            await appointmentRef.update(appointmentData);
            return new Appointment(appointmentId, appointmentData.date, appointmentData.time, appointmentData.patientEmail);
        } catch (error) {
            console.error('Error updating appointment: ', error);
            throw error;
        }
    }

    static async deleteAppointment(userEmail, appointmentId) {
        try {
            const appointmentRef = firestore.collection('users').doc(userEmail).collection('appointments').doc(appointmentId);
            await appointmentRef.delete();
        } catch (error) {
            console.error('Error deleting appointment: ', error);
            throw error;
        }
    }

    static async getAllAppointments(userEmail) {
        try {
            const appointmentsSnapshot = await firestore.collection('users').doc(userEmail).collection('appointments').get();
            const appointments = [];
            appointmentsSnapshot.forEach(doc => {
                appointments.push(new Appointment(doc.id, doc.data().date, doc.data().time, doc.data().patientEmail));
            });
            return appointments;
        } catch (error) {
            console.error('Error getting all appointments: ', error);
            throw error;
        }
    }
}

module.exports = Appointment;
