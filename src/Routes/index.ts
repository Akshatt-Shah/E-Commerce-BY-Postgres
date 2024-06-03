import { Router } from "express";
import { URoute } from "./user.routes";
const router = Router();
router.use(URoute);

export default router ;
