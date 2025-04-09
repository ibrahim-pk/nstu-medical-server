"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatus = exports.getAllAppointments = exports.getAppointmentsByUserId = exports.checkAppointmentAvailability5 = exports.checkAppointmentAvailability4 = exports.checkAppointmentAvailability3 = exports.checkAppointmentAvailability2 = exports.checkAppointmentAvailability1 = exports.bookAppointment = void 0;
const appModel_1 = __importDefault(require("./appModel"));
const bookAppointment = async (req, res) => {
    try {
        // const { patientName, date, time, userId } = req.body;
        //console.log(req.body)
        // const msg = `${patientName} has made a request for your appointment.
        // Please check the timeslot and provide your opinion.
        // Appointment-Date: ${date},
        // Appointment-Time: ${time}`;
        const newAppointment = new appModel_1.default(req.body);
        await newAppointment.save();
        //const user = await UserModel.findById(userId);
        // if (user) {
        //     user.unseenNotifications.push({
        //         type: "new-appointment-request",
        //         message: `A new appointment request has been made by ${patientName}`,
        //         onClickPath: "/doctor/appointments",
        //     });
        //     await user.save();
        // }
        res.status(200).json({ msg: "Appointment booked successfully", success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error booking appointment", success: false });
    }
};
exports.bookAppointment = bookAppointment;
//slot1
const checkAppointmentAvailability1 = async (req, res) => {
    try {
        console.log(req.body);
        const { value, date, time } = req.body;
        // console.log(req.body)
        const appointment = await appModel_1.default.findOne({
            slot: value,
            date: date,
            time: time,
        }).sort({ createdAt: -1 });
        //console.log(user);
        if (appointment?._id) {
            res.status(200).send({
                msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
                success: 1,
                booked: true
            });
        }
        else {
            res.status(200).send({
                success: 1,
                booked: false
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Error booking appointment",
            success: false,
        });
    }
};
exports.checkAppointmentAvailability1 = checkAppointmentAvailability1;
//slot2
const checkAppointmentAvailability2 = async (req, res) => {
    try {
        console.log(req.body);
        const { value, date, time } = req.body;
        // console.log(req.body)
        const appointment = await appModel_1.default.findOne({
            slot: value,
            date: date,
            time: time,
        }).sort({ createdAt: -1 });
        //console.log(user);
        if (appointment?._id) {
            res.status(200).send({
                msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
                success: 1,
                booked: true
            });
        }
        else {
            res.status(200).send({
                success: 1,
                booked: false
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Error booking appointment",
            success: false,
        });
    }
};
exports.checkAppointmentAvailability2 = checkAppointmentAvailability2;
//slot3
const checkAppointmentAvailability3 = async (req, res) => {
    try {
        console.log(req.body);
        const { value, date, time } = req.body;
        // console.log(req.body)
        const appointment = await appModel_1.default.findOne({
            slot: value,
            date: date,
            time: time,
        }).sort({ createdAt: -1 });
        //console.log(user);
        if (appointment?._id) {
            res.status(200).send({
                msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
                success: 1,
                booked: true
            });
        }
        else {
            res.status(200).send({
                success: 1,
                booked: false
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Error booking appointment",
            success: false,
        });
    }
};
exports.checkAppointmentAvailability3 = checkAppointmentAvailability3;
//slot4
const checkAppointmentAvailability4 = async (req, res) => {
    try {
        console.log(req.body);
        const { value, date, time } = req.body;
        // console.log(req.body)
        const appointment = await appModel_1.default.findOne({
            slot: value,
            date: date,
            time: time,
        }).sort({ createdAt: -1 });
        //console.log(user);
        if (appointment?._id) {
            res.status(200).send({
                msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
                success: 1,
                booked: true
            });
        }
        else {
            res.status(200).send({
                success: 1,
                booked: false
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Error booking appointment",
            success: false,
        });
    }
};
exports.checkAppointmentAvailability4 = checkAppointmentAvailability4;
//slot5
const checkAppointmentAvailability5 = async (req, res) => {
    try {
        console.log(req.body);
        const { value, date, time } = req.body;
        // console.log(req.body)
        const appointment = await appModel_1.default.findOne({
            slot: value,
            date: date,
            time: time,
        }).sort({ createdAt: -1 });
        //console.log(user);
        if (appointment?._id) {
            res.status(200).send({
                msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
                success: 1,
                booked: true
            });
        }
        else {
            res.status(200).send({
                success: 1,
                booked: false
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Error booking appointment",
            success: false,
        });
    }
};
exports.checkAppointmentAvailability5 = checkAppointmentAvailability5;
const getAppointmentsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const appointments = await appModel_1.default.find({ studentId: id });
        res.status(200).json({ message: "Appointments fetched successfully", success: true, data: appointments });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching appointments", success: false });
    }
};
exports.getAppointmentsByUserId = getAppointmentsByUserId;
const getAllAppointments = async (req, res) => {
    try {
        const { searchTerm, page = 1, limit = 10 } = req.query;
        const query = {};
        if (searchTerm) {
            query.$or = [
                { patientName: { $regex: searchTerm, $options: "i" } },
                { doctorName: { $regex: searchTerm, $options: "i" } },
                { department: { $regex: searchTerm, $options: "i" } },
            ];
        }
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;
        const totalAppointments = await appModel_1.default.countDocuments(query);
        const appointments = await appModel_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize);
        res.status(200).json({
            message: "Appointments fetched successfully",
            success: true,
            total: totalAppointments,
            totalPages: Math.ceil(totalAppointments / pageSize),
            currentPage: pageNumber,
            data: appointments,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching appointments", success: false });
    }
};
exports.getAllAppointments = getAllAppointments;
const updateAppointmentStatus = async (req, res) => {
    try {
        const { id: appointmentId } = req.params;
        const { status } = req.body;
        const updateResult = await appModel_1.default.updateOne({ _id: appointmentId }, { $set: { status } });
        if (updateResult.modifiedCount === 1) {
            return res.status(200).json({ msg: "Status updated successfully", success: true });
        }
        res.status(400).json({ msg: "No updates made", success: false });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating appointment", success: false });
    }
};
exports.updateAppointmentStatus = updateAppointmentStatus;
