"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardContoller_1 = require("./dashboardContoller");
const dashboardRouter = express_1.default.Router();
dashboardRouter.get("/", dashboardContoller_1.Dashboard);
exports.default = dashboardRouter;
