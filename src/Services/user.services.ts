import { User } from "../Models";
import { IUser } from "../Interfaces";
import bcrypt from "bcrypt";
const Jwt = require("jsonwebtoken");
export class userServices {
  async getAllUser() {
    try {
      const data = await User.findAll();
      //   console.log(data); // Ensure data is being logged
      return { Data: data, status: true };
    } catch (error: any) {
      console.error("Error in getAllUsers:", error); // Log the error
      return { message: error.message, status: false };
    }
  }
  async createUser(Data: IUser) {
    try {
      const data = await User.create({
        name: Data.name,
        email: Data.email,
        password: Data.password,
        role: Data.role,
      });

      return { Data: data, status: true };
    } catch (error: any) {
      console.error("Error in getAllUsers:", error); // Log the error
      return { message: error.message, status: false };
    }
  }
  async UpdateUser(Data: IUser, id?: string) {
    try {
      console.log(id);

      const data = await User.update(Data, {
        where: {
          id: id,
        },
      });

      return { Data: data, status: true };
    } catch (error: any) {
      console.error("Error in getAllUsers:", error); // Log the error
      return { message: error.message, status: false };
    }
  }
  async deleteUser(id?: string) {
    try {
      // console.log(id);

      const data = await User.destroy({
        where: {
          id: id,
        },
      });

      return { message: "Record Deleted Successfully", status: true };
    } catch (error: any) {
      console.error("Error in getAllUsers:", error); // Log the error
      return { message: error.message, status: false };
    }
  }
  async loginUser(email: string, password: string) {
    try {
      const data: any = await User.findOne({ where: { email: email } });
      const Compare = await bcrypt.compare(password, data.password);
      if (Compare) {
        const Token = await Jwt.sign(
          { UserId: data.id, UserRole: data.role },
          "Akshat",
          {
            expiresIn: "24h",
          }
        );
        return { message: "Login Successfull", Token: Token, status: true };
      } else {
        return { message: "Incorrect Password", status: true };
      }
    } catch (error: any) {
      console.error("Error in getAllUsers:", error); // Log the error
      return { message: error.message, status: false };
    }
  }
}
