
import { Request, Response } from "express";
import moment from "moment";
import AppointmentModel from "./appModel";
import UserModel from "../users/userModel";


export const bookAppointment = async (req: Request, res: Response) => {
    try {
       // const { patientName, date, time, userId } = req.body;
        //console.log(req.body)
        // const msg = `${patientName} has made a request for your appointment.
        // Please check the timeslot and provide your opinion.
        // Appointment-Date: ${date},
        // Appointment-Time: ${time}`;

        const newAppointment = new AppointmentModel(req.body);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error booking appointment", success: false });
    }
};

//slot1
export const checkAppointmentAvailability1=async (req:Request, res:Response) => {
    try {
      console.log(req.body);
      const { value, date, time } = req.body;
    // console.log(req.body)
      const appointment = await AppointmentModel.findOne({
        slot: value,
        date: date,
        time: time,
      }).sort({ createdAt: -1 });
      //console.log(user);
      if (appointment?._id) {
        res.status(200).send({
          msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
          success: 1,
          booked:true
        });
      }else{
        res.status(200).send({
          success: 1,
          booked:false
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Error booking appointment",
        success: false,
      });
    }
  }
 
 //slot2
export const checkAppointmentAvailability2=async (req:Request, res:Response) => {
    try {
      console.log(req.body);
      const { value, date, time } = req.body;
    // console.log(req.body)
      const appointment = await AppointmentModel.findOne({
        slot: value,
        date: date,
        time: time,
      }).sort({ createdAt: -1 });
      //console.log(user);
      if (appointment?._id) {
        res.status(200).send({
          msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
          success: 1,
          booked:true
        });
      }else{
        res.status(200).send({
          success: 1,
          booked:false
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Error booking appointment",
        success: false,
      });
    }
  } 

//slot3
export const checkAppointmentAvailability3=async (req:Request, res:Response) => {
    try {
      console.log(req.body);
      const { value, date, time } = req.body;
    // console.log(req.body)
      const appointment = await AppointmentModel.findOne({
        slot: value,
        date: date,
        time: time,
      }).sort({ createdAt: -1 });
      //console.log(user);
      if (appointment?._id) {
        res.status(200).send({
          msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
          success: 1,
          booked:true
        });
      }else{
        res.status(200).send({
          success: 1,
          booked:false
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Error booking appointment",
        success: false,
      });
    }
  }
  
  
 //slot4
export const checkAppointmentAvailability4=async (req:Request, res:Response) => {
    try {
      console.log(req.body);
      const { value, date, time } = req.body;
    // console.log(req.body)
      const appointment = await AppointmentModel.findOne({
        slot: value,
        date: date,
        time: time,
      }).sort({ createdAt: -1 });
      //console.log(user);
      if (appointment?._id) {
        res.status(200).send({
          msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
          success: 1,
          booked:true
        });
      }else{
        res.status(200).send({
          success: 1,
          booked:false
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Error booking appointment",
        success: false,
      });
    }
  } 


 //slot5
export const checkAppointmentAvailability5=async (req:Request, res:Response) => {
    try {
      console.log(req.body);
      const { value, date, time } = req.body;
    // console.log(req.body)
      const appointment = await AppointmentModel.findOne({
        slot: value,
        date: date,
        time: time,
      }).sort({ createdAt: -1 });
      //console.log(user);
      if (appointment?._id) {
        res.status(200).send({
          msg: `Booked Appointment ${appointment?.time} at ${appointment?.date}`,
          success: 1,
          booked:true
        });
      }else{
        res.status(200).send({
          success: 1,
          booked:false
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Error booking appointment",
        success: false,
      });
    }
  } 



  




export const getAppointmentsByUserId = async (req: Request, res: Response) => {
    try {
        const { id} = req.params;
        console.log(id)
        const appointments = await AppointmentModel.find({studentId:id});
        res.status(200).json({ message: "Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching appointments", success: false });
    }
};




export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const { searchTerm, page = 1, limit = 10 } = req.query;

        const query: any = {};
        if (searchTerm) {
            query.$or = [
                { patientName: { $regex: searchTerm, $options: "i" } },
                { doctorName: { $regex: searchTerm, $options: "i" } },
                { department: { $regex: searchTerm, $options: "i" } },
            ];
        }

        const pageNumber = parseInt(page as string) || 1;
        const pageSize = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * pageSize;

        const totalAppointments = await AppointmentModel.countDocuments(query);
        const appointments = await AppointmentModel.find(query)
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching appointments", success: false });
    }
};












export const updateAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const { id: appointmentId } = req.params;
        const { status } = req.body;
        
        const updateResult = await AppointmentModel.updateOne({ _id: appointmentId }, { $set: { status } });
        
        if (updateResult.modifiedCount === 1) {
            return res.status(200).json({ msg: "Status updated successfully", success: true });
        }
        res.status(400).json({ msg: "No updates made", success: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating appointment", success: false });
    }
};
