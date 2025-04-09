import { Request, Response } from "express";
import DoctorModel from "./doctorModel";

export const getDutyDoctors=async(req: Request, res: Response)=>{
  try {
    //console.log(req.body)
    let isDutyDoctor=await DoctorModel.findOne({isDuty:true})
   
    res.status(200).send(isDutyDoctor);
    
  } catch (error) {
    res.status(400).send({ error: "Error adding doctor" });
  }
}

export const getDoctors = async (req: Request, res: Response) => {
  try {
    let { page, limit, search } = req.query;

    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Search Query
    let searchQuery = {};
    if (search) {
      searchQuery = { name: { $regex: search, $options: "i" } };
    }

    // Count total filtered doctors
    const totalDoctors = await DoctorModel.countDocuments(searchQuery);

    // Fetch filtered doctors with pagination
    const doctors = await DoctorModel.find(searchQuery)
      .skip(skip)
      .limit(limitNumber);

    res.json({
      totalDoctors,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalDoctors / limitNumber),
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};



export const createDoctor = async (req: Request, res: Response) => {
  try {
    //console.log(req.body)
    let isDoctor=await DoctorModel.findOne({email:req.body.email})
    if(isDoctor){
     return res.status(200).send({ error: "Already doctor is listed" });
    }
    const newDoctor = new DoctorModel(req.body);
    await newDoctor.save();
    res.status(200).send({msg:"Doctor added"});
  } catch (error) {
    res.status(400).send({ error: "Error adding doctor" });
  }
};


export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({msg:"Information updated"});
  } catch (error) {
    res.status(400).json({ error: "Error updating doctor" });
  }
};


export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    await DoctorModel.findByIdAndDelete(req.params.id);
    res.status(200).send({msg:"Doctor deleted successfully"});
  } catch (error) {
    res.status(400).json({ error: "Error deleting doctor" });
  }
};
