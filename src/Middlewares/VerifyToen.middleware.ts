const Jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
export interface NewRequest extends Request {
  userId?: string;
}
export class VerifyToken {
  async VerifyUser(req: NewRequest, res: Response, next: NextFunction) {
    const token = req.cookies.UserToken;
    // console.log(req.cookies)
    if (!token) {
      return res.status(403).send({
        message: "No token provided",
      });
    }
    try {
      const decoded = Jwt.verify(token, "Akshat");
      req.userId = decoded.UserId;
      console.log(req.userId);
      next();
    } catch (err) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }
  }
}
