if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session')

//Import routers
const indexRouter = require("./Routes/index");
const doctorProfileRouter = require('./Routes/doctor-profile')
const bookAppointmentRouter = require('./Routes/book-appointment')
const manageAppontmentRouter = require('./Routes/manageAppointments')

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}))
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use("/", indexRouter);
app.use("/Manage-Appointments", manageAppontmentRouter);
app.use("/Doctor-Profile", doctorProfileRouter);
app.use("/book-appointment", bookAppointmentRouter)




app.listen(process.env.PORT || 4000);