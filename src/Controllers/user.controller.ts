import { Request, Response } from "express";
import { IUser } from "../Interfaces";
import { userServices } from "../Services";
import bcrypt from "bcrypt";
import { NewRequest } from "../Middlewares/VerifyToen.middleware";
const userService = new userServices();

export class UserControllers {
  async getAllUser(req: Request, res: Response) {
    try {
      const UserData = await userService.getAllUser();
      //   console.log(UserData);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      let Data: IUser = req.body;
      Data.password = await bcrypt.hash(Data.password, 10);
      const UserData = await userService.createUser(Data);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      let { name, password } = req.body;
      const UserData = await userService.loginUser(name, password);
      res.cookie("UserToken", UserData.Token);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
  async UpdateUser(req: NewRequest, res: Response) {
    try {
      let Data: IUser = req.body;
      Data.password = await bcrypt.hash(Data.password, 10);
      const { userId } = req;
      console.log(userId);
      const UserData = await userService.UpdateUser(Data, userId);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
  async deleteUser(req: NewRequest, res: Response) {
    try {
      const { userId } = req;
      const UserData = await userService.deleteUser(userId);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
}
