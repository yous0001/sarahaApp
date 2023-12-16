import { Router } from "express";
import * as usercontoller from "./user.controller.js"
import expressAsyncHandler from "express-async-handler";

const router=Router();

router.post("/signup",expressAsyncHandler(usercontoller.SignUpapi))
router.post("/signin",expressAsyncHandler(usercontoller.signin))
router.put("/updateuser",expressAsyncHandler(usercontoller.updateAccount))
router.delete("/deleteuser",expressAsyncHandler(usercontoller.deleteUser))
router.get("/getuserdata/:_id",expressAsyncHandler(usercontoller.getuserdata))


export default router;