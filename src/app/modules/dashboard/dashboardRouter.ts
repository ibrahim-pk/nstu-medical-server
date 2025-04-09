import express from "express";
import { Dashboard } from "./dashboardContoller";


const dashboardRouter = express.Router();

dashboardRouter.get("/", Dashboard);

export default dashboardRouter;
