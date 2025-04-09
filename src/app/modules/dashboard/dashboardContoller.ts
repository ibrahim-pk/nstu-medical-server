import { Request, Response } from "express";
import UserModel from "../users/userModel";
import DoctorModel from "../doctors/doctorModel";
import MedicineModel from "../medicine/medicalModel";
import AppointmentModel from "../appointment/appModel";


export const Dashboard = async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalDoctors, totalMedicines, totalAppointments] = await Promise.all([
      UserModel.countDocuments(),
      DoctorModel.countDocuments(),
      MedicineModel.countDocuments(),
      AppointmentModel.countDocuments()
    ]);
  
    console.log(totalUsers)
    res.status(200).send({
      success: true,
      message: "Statistics fetched successfully",
      data: {
        totalUsers,
        totalDoctors,
        totalMedicines,
        totalAppointments,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
