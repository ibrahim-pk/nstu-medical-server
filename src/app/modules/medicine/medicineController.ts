import { Request, Response } from 'express';
import MedicineModel from './medicalModel';


export const getMedicines = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 10; 
    const search = req.query.search ? (req.query.search as string) : ""; 
    const skip = (page - 1) * limit;

    // **সার্চ শর্ত তৈরি**
    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } } // Case-insensitive search
      : {};

    // **ডাটাবেজ থেকে ওষুধের তথ্য আনা**
    const medicines = await MedicineModel.find(searchQuery)
      .skip(skip)
      .limit(limit);

    // **মোট সার্চ রেজাল্টের সংখ্যা গণনা**
    const totalMedicines = await MedicineModel.countDocuments(searchQuery);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalMedicines / limit),
      totalItems: totalMedicines,
      medicines,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching medicines"});
  }
}

export const createMedicine = async (req: Request, res: Response) => {
  try {
    const {name}=req.body
    const isMedicine=await MedicineModel.findOne({name})
    if(isMedicine){
       return  res.status(200).json({ error: 'Medicine already listed' })
    }
    const newMedicine = new MedicineModel(req.body);
    await newMedicine.save();
    res.status(200).json({ msg: 'Medicine Added'});
  } catch (error) {
    res.status(500).json({ error: 'Error creating medicine'});
  }
};

export const updateMedicine = async (req: Request, res: Response) => {
  console.log(req.params.id)
  try {
    const updatedMedicine = await MedicineModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({msg:"Medicine name updated"});
  } catch (error) {
    res.status(500).json({ message: 'Error updating medicine', error });
  }
};

export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    await MedicineModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting medicine'});
  }
};