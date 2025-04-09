"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("./doctorController");
const adminAuth_1 = __importDefault(require("../../middlewares/adminAuth"));
const doctorRouter = express_1.default.Router();
doctorRouter.get("/", doctorController_1.getDoctors);
doctorRouter.get("/duty-doctor", doctorController_1.getDutyDoctors);
doctorRouter.post("/", (0, adminAuth_1.default)(), doctorController_1.createDoctor);
doctorRouter.put("/:id", (0, adminAuth_1.default)(), doctorController_1.updateDoctor);
doctorRouter.delete("/:id", (0, adminAuth_1.default)(), doctorController_1.deleteDoctor);
exports.default = doctorRouter;
