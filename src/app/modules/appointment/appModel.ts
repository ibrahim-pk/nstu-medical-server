import mongoose, { Schema, Document } from "mongoose";
import { IAppointment } from "./appInterface";

interface IAppointmentModel extends IAppointment, Document {}

const AppointmentSchema = new Schema<IAppointmentModel>(
  {
    userId: { type: String, required: true },
    patientName: { type: String, required: true },
    gender: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    studentId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    slot: { type: Number, required: true },
    status: { type: Number, required: true, default: 0 },
    issues: { type: String },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model<IAppointmentModel>("appointments", AppointmentSchema);
export default AppointmentModel;
