import { Router } from "express";
import * as messagecontroller from "./messages.controller.js"
import expressAsyncHandler from "express-async-handler";

const router=Router();

router.post('/:sendTo',expressAsyncHandler(messagecontroller.sendMessage))
router.delete('/',expressAsyncHandler(messagecontroller.deletemesssage))
router.put('/',expressAsyncHandler(messagecontroller.markmessage))
router.get('/',expressAsyncHandler(messagecontroller.listUserMessages))


export default router;