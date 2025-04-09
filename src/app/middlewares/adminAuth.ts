import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import dotenv from "dotenv";
import { verifyToken } from "../../helpers/jwtHelpers";

dotenv.config();

const adminAuth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const authHeader = req.headers.authorization;
      console.log(authHeader)
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      const token = authHeader.split(" ")[1]; // "Bearer TOKEN_VALUE"

      
      const verifiedUser = verifyToken(token, process.env.JWT_SECRET as Secret);
      //console.log(verifiedUser)
      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
      }
     
      if (!(verifiedUser.role==='admin')) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid User");
      }
      


      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden: Insufficient permissions");
      }

      next();
    } catch (error) {
      console.error("Authentication Error:", error);
      next(error);
    }
  };

export default adminAuth;
