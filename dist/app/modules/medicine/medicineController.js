"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicine = exports.updateMedicine = exports.createMedicine = exports.getMedicines = void 0;
const medicalModel_1 = __importDefault(require("./medicalModel"));
const getMedicines = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search ? req.query.search : "";
        const skip = (page - 1) * limit;
        // **সার্চ শর্ত তৈরি**
        const searchQuery = search
            ? { name: { $regex: search, $options: "i" } } // Case-insensitive search
            : {};
        // **ডাটাবেজ থেকে ওষুধের তথ্য আনা**
        const medicines = await medicalModel_1.default.find(searchQuery)
            .skip(skip)
            .limit(limit);
        // **মোট সার্চ রেজাল্টের সংখ্যা গণনা**
        const totalMedicines = await medicalModel_1.default.countDocuments(searchQuery);
        res.json({
            page,
            limit,
            totalPages: Math.ceil(totalMedicines / limit),
            totalItems: totalMedicines,
            medicines,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching medicines" });
    }
};
exports.getMedicines = getMedicines;
const createMedicine = async (req, res) => {
    try {
        const { name } = req.body;
        const isMedicine = await medicalModel_1.default.findOne({ name });
        if (isMedicine) {
            return res.status(200).json({ error: 'Medicine already listed' });
        }
        const newMedicine = new medicalModel_1.default(req.body);
        await newMedicine.save();
        res.status(200).json({ msg: 'Medicine Added' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating medicine' });
    }
};
exports.createMedicine = createMedicine;
const updateMedicine = async (req, res) => {
    console.log(req.params.id);
    try {
        const updatedMedicine = await medicalModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ msg: "Medicine name updated" });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating medicine', error });
    }
};
exports.updateMedicine = updateMedicine;
const deleteMedicine = async (req, res) => {
    try {
        await medicalModel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: 'Medicine deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting medicine' });
    }
};
exports.deleteMedicine = deleteMedicine;
