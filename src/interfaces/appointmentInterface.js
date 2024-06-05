class AppointmentInterface {
    static async createAppointment(userEmail, appointmentData) {}
    static async getAppointment(userEmail, appointmentId) {}
    static async updateAppointment(userEmail, appointmentId, appointmentData) {}
    static async deleteAppointment(userEmail, appointmentId) {}
    static async getAllAppointments(userEmail) {}
}

module.exports = AppointmentInterface;
