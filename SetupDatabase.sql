CREATE SCHEMA `hospitaldatabase`;

CREATE TABLE `hospitaldatabase`.`admin` (
  `admin_ID` int PRIMARY KEY AUTO_INCREMENT,
  `admin_email` varchar(255),
  `admin_name` varchar(255),
  `admin_username` varchar(255),
  `admin_password` varchar(255),
  `admin_contact_number` varchar(255)
);

CREATE TABLE `hospitaldatabase`.`patient` (
  `patient_ID` varchar(25) PRIMARY KEY,
  `patient_first_name` varchar(255),
  `patient_last_name` varchar(255),
  `patient_age` int,
  `patient_gender` int,
  `patient_address` varchar(255),
  `patient_email` varchar(255),
  `patient_contact_number` varchar(20),
  `patient_OTP` int
);

CREATE TABLE `hospitaldatabase`.`appointment_Details` (
  `appointment_ID` int PRIMARY KEY AUTO_INCREMENT,
  `appointment_patient_ID` varchar(25),
  `doctor_schedule_id` int,
  `appointment_doctor_ID` int,
  `appointment_creation_Date` timestamp,
  `appointment_status` enum('CONFIRMED', 'REJECTED', 'PENDING') DEFAULT 'PENDING',
  `patient_message` varchar(255)
);

CREATE TABLE `hospitaldatabase`.`doctor` (
  `doctor_ID` int PRIMARY KEY AUTO_INCREMENT,
  `doctor_first_name` varchar(255),
  `doctor_last_name` varchar(255),
  `doctor_deptID` int,
  `doctor_contact_number` varchar(255),
  `doctor_specialization` varchar(255),
  `doctor_HMO` varchar(255)
);

CREATE TABLE `hospitaldatabase`.`doctor_schedule_table` (
  `doctor_schedule_id` int PRIMARY KEY AUTO_INCREMENT,
  `doctor_id` int,
  `doctor_schedule_date` Date,
  `doctor_schedule_start_time` Time,
  `doctor_schedule_end_time` Time,
  `doctor_schedule_status` enum('AVAILABLE', 'UNAVAILABLE') DEFAULT 'AVAILABLE'
);

CREATE TABLE `hospitaldatabase`.`Department` (
  `deptID` int PRIMARY KEY AUTO_INCREMENT,
  `deptName` varchar(255),
  `building` varchar(255)
);

ALTER TABLE `hospitaldatabase`.`appointment_Details` ADD FOREIGN KEY (`appointment_patient_ID`) REFERENCES `hospitaldatabase`.`patient` (`patient_ID`);

ALTER TABLE `hospitaldatabase`.`appointment_Details` ADD FOREIGN KEY (`doctor_schedule_id`) REFERENCES `hospitaldatabase`.`doctor_schedule_table` (`doctor_schedule_id`);

ALTER TABLE `hospitaldatabase`.`doctor` ADD FOREIGN KEY (`doctor_deptID`) REFERENCES `hospitaldatabase`.`Department` (`deptID`);

ALTER TABLE `hospitaldatabase`.`doctor_schedule_table` ADD FOREIGN KEY (`doctor_id`) REFERENCES `hospitaldatabase`.`doctor` (`doctor_ID`);
