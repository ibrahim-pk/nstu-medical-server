import mongoose, { Schema, Document } from 'mongoose';
import { IMedicine } from './medicineInterface';


interface IMedicineModel extends IMedicine, Document {}

const MedicineSchema: Schema = new Schema({
  name: { type: String, required: true },
  available: { type: Boolean, default: true },
});

const MedicineModel=mongoose.model<IMedicineModel>('Medicine', MedicineSchema);

export default MedicineModel;