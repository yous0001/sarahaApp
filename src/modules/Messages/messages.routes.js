import { Router } from "express";
import * as messagecontroller from "./messages.controller.js"

const router=Router();

router.post('/:sendTo',messagecontroller.sendMessage)
router.delete('/',messagecontroller.deletemesssage)

export default router;