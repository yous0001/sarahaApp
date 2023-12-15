import { Router } from "express";
import * as messagecontroller from "./messages.controller.js"

const router=Router();

router.post('/:sendTo',messagecontroller.sendMessage)
router.delete('/',messagecontroller.deletemesssage)
router.put('/',messagecontroller.markmessage)
router.get('/',messagecontroller.listUserMessages)

export default router;