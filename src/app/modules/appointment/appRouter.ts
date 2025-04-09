// routers/appointmentRoutes.ts
import express from "express";
import { bookAppointment, checkAppointmentAvailability1, checkAppointmentAvailability2, checkAppointmentAvailability3, checkAppointmentAvailability4, checkAppointmentAvailability5, getAllAppointments, getAppointmentsByUserId, updateAppointmentStatus } from "./appController";


const appointmentRouder = express.Router();

appointmentRouder.post("/book", bookAppointment);
appointmentRouder.post("/available-appointment/slot1",checkAppointmentAvailability1)
appointmentRouder.post("/available-appointment/slot2",checkAppointmentAvailability2)
appointmentRouder.post("/available-appointment/slot3",checkAppointmentAvailability3)
appointmentRouder.post("/available-appointment/slot4",checkAppointmentAvailability4)
appointmentRouder.post("/available-appointment/slot5",checkAppointmentAvailability5)


appointmentRouder.get("/user/:id", getAppointmentsByUserId);
appointmentRouder.get("/all", getAllAppointments);
appointmentRouder.put("/update/:id", updateAppointmentStatus);

export default appointmentRouder;