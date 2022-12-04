const database = require('../database');
const pool = require('../database');

exports.getOneDoctor = async function(id) {
    return pool.query(`select doctor.doctor_ID, doctor_first_name, doctor_last_name, doctor_specialization, doctor_HMO, date_format(doctor_schedule_date, '%W') AS day, doctor_schedule_start_time AS start, doctor_schedule_end_time AS end
                       from doctor inner join doctor_schedule_table on doctor_schedule_table.doctor_id = doctor.doctor_ID where doctor.doctor_ID = ?`, [id])
}

exports.getDoctor = async function() {
    return pool.query(`select doctor_ID, doctor_first_name, doctor_last_name, doctor_specialization, doctor_HMO from doctor`)
}

exports.getSchedule = async function() {
    return pool.query(`select doctor.doctor_ID, date_format(doctor_schedule_date, '%W') AS day, doctor_schedule_start_time AS start
    from doctor inner join doctor_schedule_table on doctor_schedule_table.doctor_id = doctor.doctor_ID `)
}

//Get Doctor's List filtered by SPECIALIZATION and SUB SPECIALIZATION
exports.getDoctor_Using_Spec_doctor_HMO = async function(spec, doctor_HMO) {
    return pool.query(`select doctor_ID, doctor_first_name, doctor_last_name, doctor_specialization, doctor_HMO  from doctor where doctor_specialization = ? OR doctor_HMO = ?`, [spec, doctor_HMO])
}

exports.getSchedule_Using_Spec_doctor_HMO = async function(spec, doctor_HMO) {
        return pool.query(`select doctor.doctor_ID, date_format(doctor_schedule_date, '%W') AS day, doctor_schedule_start_time AS start
                          from doctor inner join doctor_schedule_table on doctor_schedule_table.doctor_id = doctor.doctor_ID
                          where doctor.doctor_specialization = ? OR doctor.doctor_HMO = ?`, [spec, doctor_HMO])
    }
    //Get Doctor's List using ALL search queries
exports.getDoctor_Using_All = async function(doctor_Fname, doctor_Lname, spec, doctor_HMO) {
    return pool.query(`select doctor_ID, doctor_first_name, doctor_last_name, doctor_specialization, doctor_HMO from doctor
                      where  doctor_specialization = ? OR  doctor_HMO = ? having  doctor_first_name LIKE ? OR doctor_last_name LIKE ?`, [spec, doctor_HMO, `%${doctor_Fname}%`, `%${doctor_Lname}%`])
}
exports.getSchedule_Using_All = async function(doctor_Fname, doctor_Lname, spec, doctor_HMO) {
    return pool.query(`select doctor.doctor_ID, date_format(doctor_schedule_date, '%W') AS day, doctor_schedule_start_time AS start
                       from doctor inner join doctor_schedule_table on doctor_schedule_table.doctor_id = doctor.doctor_ID
                       where doctor_specialization = ? OR  doctor_HMO = ? having  doctor_first_name LIKE ? OR doctor_last_name LIKE ?`, [spec, doctor_HMO, `%${doctor_Fname}%`, `%${doctor_Lname}%`])
}

exports.getDoctor_Using_Fname_Lname = async function(doctor_Fname, doctor_Lname) {
    return pool.query(`select doctor_ID, doctor_first_name, doctor_last_name, doctor_specialization, doctor_HMO  from doctor where doctor_first_name LIKE ? AND doctor_last_name LIKE ?`, [`%${doctor_Fname}%`, `%${doctor_Lname}%`])
}
exports.getSchedule_Using_Fname_Lname = async function(doctor_Fname, doctor_Lname) {
    return pool.query(`select doctor.doctor_ID, date_format(doctor_schedule_date, '%W') AS day, doctor_schedule_start_time AS start
from doctor inner join doctor_schedule_table on doctor_schedule_table.doctor_id = doctor.doctor_ID where doctor_first_name LIKE ? AND doctor_last_name LIKE ?`, [`%${doctor_Fname}%`, `%${doctor_Lname}%`])
}

//Get Doctor's List filtered by their FIRST name
exports.getDoctor_Using_Fname = async function(doctor_Fname) {
    return pool.query(`select doctor_ID, doctor_first_name, doctor_last_name, doctor_specialization, doctor_HMO  from doctor having  doctor_first_name LIKE ?`, [`%${doctor_Fname}%`])
}

exports.getSchedule_Using_Fname = async function(doctor_Fname) {
    return pool.query(`select doctor.doctor_ID, date_format(doctor_schedule_date, '%W') AS day, doctor_schedule_start_time AS start
from doctor inner join doctor_schedule_table on doctor_schedule_table.doctor_id = doctor.doctor_ID where doctor_first_name LIKE ?`, [`%${doctor_Fname}%`])
}

//Get Doctor's List filtered by their LAST name
exports.getDoctor_Using_Lname = async function(doctor_Lname) {
    return pool.query(`select doctor_ID, doctor_first_name, doctor_last_name, doctor_specialization, doctor_HMO  from doctor having doctor_last_name LIKE ?`, [`%${doctor_Lname}%`])
}
exports.getSchedule_Using_Lname = async function(doctor_Lname) {
    return pool.query(`select doctor.doctor_ID, date_format(doctor_schedule_date, '%W') AS day, doctor_schedule_start_time AS start
    from doctor inner join doctor_schedule_table on doctor_schedule_table.doctor_id = doctor.doctor_ID where doctor_last_name LIKE ?`, [`%${doctor_Lname}%`])
}


/*
exports.get = async function(searchQuery) {
    if (searchQuery != null) {
        let query = `select * from doctor where specialization = 'dentist' OR sub_specialization = 'neurologlist' having first_name LIKE '%${searchQuery}%' OR last_name LIKE '%${searchQuery}%' `;
        return await pool.query(query);
    } else {
        let query = 'select * from doctor';
        return await pool.query(query);
    }


    e
}


exports.getOne = async function(id) {
    let query = `select * from doctor where doctor_ID = ${id}`;
    return await pool.query(query);

}

exports.getSchedules = async function(searchQuery) {
    if (searchQuery != null) {
        let query = `Select doctor.doctor_ID, doctor.first_name,doctor.last_name, date_format(doctor_availability.date, '%W, %M %Y') AS date, start_time, end_time 
                        from doctor_availability 
                        Inner join junction_Schedule ON doctor_availability.availability_ID = junction_Schedule.availability_ID 
                        Inner join doctor ON junction_Schedule.doctor_ID = doctor.doctor_ID where doctor.first_name LIKE '%${searchQuery}%'`;
        return await pool.query(query);
    } else {
        let query = `Select doctor.doctor_ID, doctor.first_name,doctor.last_name, date_format(doctor_availability.date, '%W, %M %Y') AS date, start_time, end_time 
                        from doctor_availability 
                        Inner join junction_Schedule ON doctor_availability.availability_ID = junction_Schedule.availability_ID 
                        Inner join doctor ON junction_Schedule.doctor_ID = doctor.doctor_ID`
        return await pool.query(query);
    }
}

exports.getSchedule = async function(id) {
    let query = `Select doctor.first_name,doctor.last_name, date_format(doctor_availability.date, '%W, %M %Y') AS date, start_time, end_time 
                     from doctor_availability 
                     Inner join junction_Schedule ON doctor_availability.availability_ID = junction_Schedule.availability_ID 
                     Inner join doctor ON junction_Schedule.doctor_ID = doctor.doctor_ID where doctor.doctor_ID = ${id}`
    return await pool.query(query);
}
*/