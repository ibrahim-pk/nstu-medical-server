import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import medicineROuter from './app/modules/medicine/medicalRouter';
import doctorRouter from './app/modules/doctors/doctorRouter';
import appointmentRouder from './app/modules/appointment/appRouter';
import userRouter from './app/modules/users/userRouter';
import dashboardRouter from './app/modules/dashboard/dashboardRouter';

const app: Application = express();

//app.use(cors({ origin:["https://medicalcenter.nstu.edu.bd",'http://localhost:3000'], credentials: true }));

const corsOptions = {
  origin: ["https://medicalcenter.nstu.edu.bd","http://medicalcenter.nstu.edu.bd","http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//api
 app.use('/api/v1/medicine', medicineROuter);
 app.use('/api/v1/doctors', doctorRouter);
 app.use('/api/v1/appointment', appointmentRouder);
 app.use('/api/v1/user', userRouter);
 app.use("/api/v1/dashboard", dashboardRouter);



app.get('/', async (req: Request, res: Response, next: NextFunction) => {
   res.status(200).send("server is running ")
})











//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
