"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const medicalRouter_1 = __importDefault(require("./app/modules/medicine/medicalRouter"));
const doctorRouter_1 = __importDefault(require("./app/modules/doctors/doctorRouter"));
const appRouter_1 = __importDefault(require("./app/modules/appointment/appRouter"));
const userRouter_1 = __importDefault(require("./app/modules/users/userRouter"));
const dashboardRouter_1 = __importDefault(require("./app/modules/dashboard/dashboardRouter"));
const app = (0, express_1.default)();
//app.use(cors({ origin:["https://medicalcenter.nstu.edu.bd",'http://localhost:3000'], credentials: true }));
const corsOptions = {
    origin: ["https://medicalcenter.nstu.edu.bd", "http://medicalcenter.nstu.edu.bd", "http://localhost:3000"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//api
app.use('/api/v1/medicine', medicalRouter_1.default);
app.use('/api/v1/doctors', doctorRouter_1.default);
app.use('/api/v1/appointment', appRouter_1.default);
app.use('/api/v1/user', userRouter_1.default);
app.use("/api/v1/dashboard", dashboardRouter_1.default);
app.get('/', async (req, res, next) => {
    res.status(200).send("server is running ");
});
//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
