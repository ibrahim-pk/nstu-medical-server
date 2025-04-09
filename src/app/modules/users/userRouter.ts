import express from "express";
import { createUser, deleteUser, editUser, getAdmin, getUserById, getUsers } from "./userController";
import auth from "../../middlewares/auth";
import adminAuth from "../../middlewares/adminAuth";


const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/admin", getAdmin);
userRouter.post("/", createUser);
userRouter.put("/:id",auth(), editUser);
userRouter.get("/:id",getUserById);
userRouter.delete("/:id",adminAuth(), deleteUser);

export default userRouter;
