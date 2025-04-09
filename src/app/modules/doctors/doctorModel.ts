import mongoose, { Schema, Document } from "mongoose";
import { IDoctor } from "./doctorInterface";


interface IDoctorModel extends IDoctor, Document {}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  about: { type: String, required: true },
  imageUrl: { type: String},
  dutyDate: { type: String},
  dutyTime: { type: String},
  dutyAmPm: { type: String},
  isDuty:{type:Boolean, default:false}
});

const DoctorModel= mongoose.model<IDoctorModel>("Doctor", DoctorSchema);

export default DoctorModel;
