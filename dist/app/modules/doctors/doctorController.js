"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctors = exports.getDutyDoctors = void 0;
const doctorModel_1 = __importDefault(require("./doctorModel"));
const getDutyDoctors = async (req, res) => {
    try {
        //console.log(req.body)
        let isDutyDoctor = await doctorModel_1.default.findOne({ isDuty: true });
        res.status(200).send(isDutyDoctor);
    }
    catch (error) {
        res.status(400).send({ error: "Error adding doctor" });
    }
};
exports.getDutyDoctors = getDutyDoctors;
const getDoctors = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        // Search Query
        let searchQuery = {};
        if (search) {
            searchQuery = { name: { $regex: search, $options: "i" } };
        }
        // Count total filtered doctors
        const totalDoctors = await doctorModel_1.default.countDocuments(searchQuery);
        // Fetch filtered doctors with pagination
        const doctors = await doctorModel_1.default.find(searchQuery)
            .skip(skip)
            .limit(limitNumber);
        res.json({
            totalDoctors,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalDoctors / limitNumber),
            doctors,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching doctors" });
    }
};
exports.getDoctors = getDoctors;
const createDoctor = async (req, res) => {
    try {
        //console.log(req.body)
        let isDoctor = await doctorModel_1.default.findOne({ email: req.body.email });
        if (isDoctor) {
            return res.status(200).send({ error: "Already doctor is listed" });
        }
        const newDoctor = new doctorModel_1.default(req.body);
        await newDoctor.save();
        res.status(200).send({ msg: "Doctor added" });
    }
    catch (error) {
        res.status(400).send({ error: "Error adding doctor" });
    }
};
exports.createDoctor = createDoctor;
const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await doctorModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ msg: "Information updated" });
    }
    catch (error) {
        res.status(400).json({ error: "Error updating doctor" });
    }
};
exports.updateDoctor = updateDoctor;
const deleteDoctor = async (req, res) => {
    try {
        await doctorModel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "Doctor deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ error: "Error deleting doctor" });
    }
};
exports.deleteDoctor = deleteDoctor;
