const Jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
import { json } from "sequelize";
export interface NewRequest extends Request {
  userId?: string;
  userRole?: string;
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
      if (decoded.role === "User") {
        req.userId = decoded.UserId;
        req.userRole = decoded.Role;
        console.log(req.userId);
        next();
      } else {
        res.status(200).json({ message: "unauthorized User" });
      }
    } catch (err) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }
  }
  async VerifyAdmin(req: NewRequest, res: Response, next: NextFunction) {
    const token = req.cookies.UserToken;
    // console.log(req.cookies)
    if (!token) {
      return res.status(403).send({
        message: "No token provided",
      });
    }
    try {
      const decoded = Jwt.verify(token, "Akshat");
      if (decoded.role === "Admin") {
        req.userId = decoded.UserId;
        req.userRole = decoded.Role;
        console.log(req.userId);
        next();
      } else {
        res.status(200).json({ message: "unauthorized Admin" });
      }
    } catch (err) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }
  }
  async VerifyToken(req: NewRequest, res: Response, next: NextFunction) {
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
      req.userRole = decoded.Role;
      console.log(req.userId);
      next();
    } catch (err) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }
  }
}
