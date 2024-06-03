import { Router } from "express";
import { UserControllers } from "../Controllers";
import { VerifyToken } from "../Middlewares/VerifyToen.middleware"
const Verify = new VerifyToken();
const UserController = new UserControllers();
const URoute = Router();

URoute.get("/user/getUser", UserController.getAllUser);

URoute.post("/user/createUser", UserController.createUser);

URoute.post("/user/loginUser", UserController.loginUser);

URoute.put("/user/UpdateUser",Verify.VerifyUser, UserController.UpdateUser);

URoute.delete("/user/deleteUser",Verify.VerifyUser, UserController.deleteUser);


export { URoute };
