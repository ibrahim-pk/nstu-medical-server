import express from "express";
import { createDoctor, deleteDoctor, getDoctors, getDutyDoctors, updateDoctor } from "./doctorController";
import adminAuth from "../../middlewares/adminAuth";

const doctorRouter = express.Router();

doctorRouter.get("/", getDoctors);
doctorRouter.get("/duty-doctor", getDutyDoctors);
doctorRouter.post("/",adminAuth(), createDoctor);
doctorRouter.put("/:id",adminAuth(), updateDoctor);
doctorRouter.delete("/:id",adminAuth(), deleteDoctor);

export default doctorRouter;
