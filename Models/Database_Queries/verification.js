const database = require('../database');
const pool = require('../database');


//Generate OTP and insert to Database
exports.generateOTP = async function(email) {
    const hashed = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    pool.query(`update patient set patient_OTP = ? where patient_email = ?`, [hashed, email])
    setTimeout(() => {
        pool.query(`update patient set patient_OTP = NULL where patient_email = ?`, [email])
        console.log("deleted")
    }, 180000);
    return hashed
}

//Get OTP and send it to server for comparison
exports.fetchPatient_OTP = async function(email) {
    return pool.query(`select patient_id, patient_OTP from patient where patient_email = ?`, [email])
}