import { Router } from "express";
import * as usercontoller from "./user.controller.js"

const router=Router();

router.post("/signup",usercontoller.SignUpapi)
router.post("/signin",usercontoller.signin)
router.put("/updateuser",usercontoller.updateAccount)
router.delete("/deleteuser",usercontoller.deleteUser)
router.get("/getuserdata/:_id",usercontoller.getuserdata)


export default router;