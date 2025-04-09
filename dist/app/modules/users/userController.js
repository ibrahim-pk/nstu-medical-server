"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.getUserById = exports.getAdmin = exports.createUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("./userModel"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Get Users with Pagination and Search
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, searchTerm = "", userId } = req.query;
        const query = {};
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } }
            ];
        }
        if (userId) {
            query._id = userId;
        }
        const users = await userModel_1.default.find(query)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        const totalUsers = await userModel_1.default.countDocuments(query);
        res.status(200).json({ users, totalPages: Math.ceil(totalUsers / Number(limit)) });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};
exports.getUsers = getUsers;
// Create User (Check if already registered by email)
const createUser = async (req, res) => {
    try {
        const { email, name, photoURL, ref, password } = req.body;
        const user = await userModel_1.default.findOne({ email: email });
        if (user) {
            const token = (0, jwtHelpers_1.createToken)({ email: user?.email, role: user?.role });
            //console.log(token)
            if (ref === "google") {
                res.status(200).send({
                    message: "Login successful",
                    success: true,
                    data: token,
                    userInfo: user,
                });
            }
            else {
                const match = await bcrypt_1.default.compare(password, user.password);
                if (match) {
                    res.status(200).send({
                        message: "Login successful",
                        success: true,
                        data: token,
                        userInfo: user,
                    });
                }
                else {
                    return res.status(200).send({
                        message: "Password Mismatch",
                        success: false,
                    });
                }
            }
        }
        else if (!user) {
            if (ref === "google") {
                const hash = bcrypt_1.default.hashSync("12345678", 10);
                const newuser = new userModel_1.default({ email, name, imageUrl: photoURL, password: hash });
                const userSave = await newuser.save();
                const token = (0, jwtHelpers_1.createToken)({ email, role: "user" });
                // console.log("79",token)
                res
                    .status(200)
                    .send({
                    message: "Login successful",
                    success: true,
                    data: token,
                    userInfo: userSave,
                });
            }
            else {
                res
                    .status(200)
                    .send({
                    message: "invalid user",
                    success: false,
                });
            }
        }
    }
    catch (error) {
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
exports.createUser = createUser;
const getAdmin = async (req, res) => {
    try {
        const user = await userModel_1.default.find({ role: "admin" });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching user by ID" });
    }
};
exports.getAdmin = getAdmin;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        //console.log(id)
        const user = await userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching user by ID" });
    }
};
exports.getUserById = getUserById;
// Edit User
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, email, imageUrl, role, gender, phone, dept, studentID } = req.body.user;
        let pass = req.body.password;
        let hash;
        if (pass) {
            hash = bcrypt_1.default.hashSync(pass, 10);
        }
        else {
            hash = password;
        }
        const updatedUser = await userModel_1.default.findByIdAndUpdate(id, {
            name, password: hash, email, imageUrl, role, gender, phone, dept, studentID
        }, { new: true });
        //console.log(updatedUser)
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
};
exports.editUser = editUser;
// Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};
exports.deleteUser = deleteUser;
