"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
dotenv_1.default.config();
const adminAuth = (...requiredRoles) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        const token = authHeader.split(" ")[1]; // "Bearer TOKEN_VALUE"
        const verifiedUser = (0, jwtHelpers_1.verifyToken)(token, process.env.JWT_SECRET);
        //console.log(verifiedUser)
        if (!verifiedUser) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token");
        }
        if (!(verifiedUser.role === 'admin')) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid User");
        }
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden: Insufficient permissions");
        }
        next();
    }
    catch (error) {
        console.error("Authentication Error:", error);
        next(error);
    }
};
exports.default = adminAuth;
