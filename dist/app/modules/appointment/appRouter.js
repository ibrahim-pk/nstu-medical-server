"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routers/appointmentRoutes.ts
const express_1 = __importDefault(require("express"));
const appController_1 = require("./appController");
const appointmentRouder = express_1.default.Router();
appointmentRouder.post("/book", appController_1.bookAppointment);
appointmentRouder.post("/available-appointment/slot1", appController_1.checkAppointmentAvailability1);
appointmentRouder.post("/available-appointment/slot2", appController_1.checkAppointmentAvailability2);
appointmentRouder.post("/available-appointment/slot3", appController_1.checkAppointmentAvailability3);
appointmentRouder.post("/available-appointment/slot4", appController_1.checkAppointmentAvailability4);
appointmentRouder.post("/available-appointment/slot5", appController_1.checkAppointmentAvailability5);
appointmentRouder.get("/user/:id", appController_1.getAppointmentsByUserId);
appointmentRouder.get("/all", appController_1.getAllAppointments);
appointmentRouder.put("/update/:id", appController_1.updateAppointmentStatus);
exports.default = appointmentRouder;
