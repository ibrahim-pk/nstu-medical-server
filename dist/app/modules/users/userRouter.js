"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const adminAuth_1 = __importDefault(require("../../middlewares/adminAuth"));
const userRouter = express_1.default.Router();
userRouter.get("/", userController_1.getUsers);
userRouter.get("/admin", userController_1.getAdmin);
userRouter.post("/", userController_1.createUser);
userRouter.put("/:id", (0, auth_1.default)(), userController_1.editUser);
userRouter.get("/:id", userController_1.getUserById);
userRouter.delete("/:id", (0, adminAuth_1.default)(), userController_1.deleteUser);
exports.default = userRouter;
