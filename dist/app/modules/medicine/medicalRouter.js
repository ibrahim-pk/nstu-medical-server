"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicineController_1 = require("./medicineController");
const adminAuth_1 = __importDefault(require("../../middlewares/adminAuth"));
const medicineROuter = express_1.default.Router();
medicineROuter.get('/', medicineController_1.getMedicines);
medicineROuter.post('/', (0, adminAuth_1.default)(), medicineController_1.createMedicine);
medicineROuter.put('/:id', (0, adminAuth_1.default)(), medicineController_1.updateMedicine);
medicineROuter.delete('/:id', (0, adminAuth_1.default)(), medicineController_1.deleteMedicine);
exports.default = medicineROuter;
