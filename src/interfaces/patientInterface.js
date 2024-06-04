// interfaces/patientInterface.js
class PatientInterface {
    static async createPatient(userEmail, patientData) {}
    static async getPatient(userEmail, patientEmail) {}
    static async updatePatient(userEmail, patientEmail, patientData) {}
    static async deletePatient(userEmail, patientEmail) {}
    static async getAllPatients(userEmail) {}
}

module.exports = PatientInterface;
