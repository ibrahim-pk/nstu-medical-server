import { Request, Response } from "express";
import UserModel from "./userModel";
import { createToken } from "../../../helpers/jwtHelpers";
import bcrypt from 'bcrypt'
// Get Users with Pagination and Search
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, searchTerm = "", userId } = req.query;
    const query: any = {};

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } }
      ];
    }

    if (userId) {
      query._id = userId;
    }

    const users = await UserModel.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalUsers = await UserModel.countDocuments(query);

    res.status(200).json({ users, totalPages: Math.ceil(totalUsers / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Create User (Check if already registered by email)
export const createUser = async (req: Request, res: Response) => {

  try {
    const { email,name,photoURL,ref,password } = req.body;

    const user = await UserModel.findOne({ email:email });
    
   if(user){
    const token = createToken({ email: user?.email,role:user?.role });
    //console.log(token)
       if(ref==="google"){
        res.status(200).send({
            message: "Login successful",
            success: true,
            data: token,
            userInfo: user,
          });
       }else{

        const match = await bcrypt.compare(password, user.password);

        if(match) {
          res.status(200).send({
            message: "Login successful",
            success: true,
            data: token,
            userInfo: user,
          });
         }else{
         return res.status(200).send({
            message: "Password Mismatch",
            success: false,
            
          });
         }
        }

       
   }else if (!user) {
      if(ref==="google"){
        const hash = bcrypt.hashSync("12345678", 10);
        const newuser = new UserModel({email,name,imageUrl:photoURL,password:hash});
        const userSave = await newuser.save();
        const token = createToken({ email,role:"user" });
       // console.log("79",token)
        res
          .status(200)
          .send({
            message: "Login successful",
            success: true,
            data: token,
            userInfo: userSave,
          });

      }else {
    
        res
          .status(200)
          .send({
            message: "invalid user",
            success: false,
          });
      }
      
      
    } 
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }



  // try {

  //   const { email,name,photoURL,ref } = req.body;
  //   console.log(req.body)
  //   const existingUser = await UserModel.findOne({ email });

  //   if (existingUser) {
  //     return res.status(400).json({ message: "User with this email already exists" });
  //   }

  //   const newUser = new UserModel(req.body);
  //   await newUser.save();
  //   res.status(201).json(newUser);
  // } catch (error) {
  //   res.status(500).json({ message: "Error creating user" });
  // }
};



export const getAdmin = async (req: Request, res: Response) => {
  try {
  
    const user = await UserModel.find({role:"admin"});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user by ID" });
  }
};






export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //console.log(id)
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user by ID" });
  }
};

// Edit User
export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {name,password,email,imageUrl,role,gender,phone,dept,studentID}=req.body.user
    let pass=req.body.password;
    let hash:any;
    if(pass){
       hash = bcrypt.hashSync(pass, 10);
    }else{
      hash=password
    }
    
    
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      name,password:hash,email,imageUrl,role,gender,phone,dept,studentID
    }, { new: true });
   
    //console.log(updatedUser)

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
