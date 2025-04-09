import express from 'express';
import { createMedicine, deleteMedicine, getMedicines, updateMedicine } from './medicineController';
import adminAuth from '../../middlewares/adminAuth';

const medicineROuter = express.Router();

medicineROuter.get('/', getMedicines);
medicineROuter.post('/',adminAuth(), createMedicine);
medicineROuter.put('/:id', adminAuth(),updateMedicine);
medicineROuter.delete('/:id',adminAuth(), deleteMedicine);

export default medicineROuter;