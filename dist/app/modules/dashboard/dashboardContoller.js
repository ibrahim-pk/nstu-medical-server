"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const userModel_1 = __importDefault(require("../users/userModel"));
const doctorModel_1 = __importDefault(require("../doctors/doctorModel"));
const medicalModel_1 = __importDefault(require("../medicine/medicalModel"));
const appModel_1 = __importDefault(require("../appointment/appModel"));
const Dashboard = async (req, res) => {
    try {
        const [totalUsers, totalDoctors, totalMedicines, totalAppointments] = await Promise.all([
            userModel_1.default.countDocuments(),
            doctorModel_1.default.countDocuments(),
            medicalModel_1.default.countDocuments(),
            appModel_1.default.countDocuments()
        ]);
        console.log(totalUsers);
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
    }
    catch (error) {
        console.error(error);
    }
};
exports.Dashboard = Dashboard;
