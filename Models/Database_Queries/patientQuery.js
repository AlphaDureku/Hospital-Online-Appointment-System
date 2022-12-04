const database = require('../database');
const pool = require('../database');

//Insert new patient
exports.insertPatient = async function(first_name, last_name, email, contact, address, age) {
    pool.query(`insert into patient(patient_ID, patient_first_name, patient_last_name, patient_email, patient_contact_number, patient_address, patient_age)
    values(?, ?, ? , ? ,? ,?, ?)`, [uniqid(), first_name, last_name, email, contact, address, age])
}

// Get Email from All patients
exports.fetchPatient_Directory = async function() {
    return pool.query(`select patient_email from patient`)
}

//Get Patient Appointment List by passing their patient email
exports.fetchPatient_Appointments_Using_Email = async function(patient_Email) {
    return pool.query(`select * from appointment_details where appointment_patient_ID = (select patient_id from patient where patient_email = ?)`, [patient_Email])
}

//Get Patient Appointment List with their INFO by passing their patient ID
exports.fetchPatient_Appointments_Using_ID = async function(patient_id) {
    return pool.query(`select patient_first_name, patient_Email, patient_last_name, doctor_first_name, doctor_last_name, gender, doctor_specialization, date_format(doctor_schedule_date,'%M %D, %Y') AS date, doctor_schedule_start_time, doctor_HMO, appointment_status from patient
                       inner join appointment_details on patient.patient_id = appointment_details.appointment_patient_id
                       inner join doctor on doctor.doctor_id = appointment_details.appointment_doctor_ID left join doctor_schedule_table on appointment_details.doctor_schedule_id = doctor_schedule_table.doctor_schedule_id
                       where patient.patient_id = ?`, [patient_id])
}


//Generate Uniq Patient ID
function uniqid(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
};