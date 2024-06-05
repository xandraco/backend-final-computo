// models/patientModel.js
const admin = require('../config/firebase');
const firestore = admin.firestore();
const patientInterface = require('../interfaces/patientInterface')

class Patient extends patientInterface {
    constructor(email, data) {
        super()
        this.email = email;
        this.data = data;
    }

    static async createPatient(userEmail, patientData) {
        try {
            const patientEmail = patientData.email;
            const patientRef = firestore.collection('users').doc(userEmail).collection('patients').doc(patientEmail);
            await patientRef.set(patientData);
            return new Patient(patientEmail, patientData);
        } catch (error) {
            console.error('Error creating patient: ', error);
            throw error;
        }
    }

    static async getPatient(userEmail, patientEmail) {
        try {
            const patientRef = firestore.collection('users').doc(userEmail).collection('patients').doc(patientEmail);
            const patientDoc = await patientRef.get();
            if (patientDoc.exists) {
                return new Patient(patientEmail, patientDoc.data());
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting patient: ', error);
            throw error;
        }
    }

    static async updatePatient(userEmail, patientEmail, patientData) {
        try {
            const patientRef = firestore.collection('users').doc(userEmail).collection('patients').doc(patientEmail);
            await patientRef.update(patientData);
            return new Patient(patientEmail, patientData);
        } catch (error) {
            console.error('Error updating patient: ', error);
            throw error;
        }
    }

    static async deletePatient(userEmail, patientEmail) {
        try {
            const patientRef = firestore.collection('users').doc(userEmail).collection('patients').doc(patientEmail);
            await patientRef.delete();
        } catch (error) {
            console.error('Error deleting patient: ', error);
            throw error;
        }
    }

    static async getAllPatients(userEmail) {
        try {
            const patientsSnapshot = await firestore.collection('users').doc(userEmail).collection('patients').get();
            const patients = [];
            patientsSnapshot.forEach(doc => {
                patients.push(new Patient(doc.id, doc.data()));
            });
            return patients;
        } catch (error) {
            console.error('Error getting all patients: ', error);
            throw error;
        }
    }
}

module.exports = Patient;
