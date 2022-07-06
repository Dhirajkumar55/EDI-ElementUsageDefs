import { Router } from "express";
import { getElementUsageDefs } from "../controllers/getElementUsageDefs.js";
import { getElementUsageDefsFromPosition } from "../controllers/getElementUsageDefsFromPosition.js";
import { getMandatoryElementStatus } from "../controllers/getMandatoryElementStatus.js";
import { getElementUsageDefsWithCode } from "../controllers/getElementUsageDefsWithCode.js";
import { getCode } from "../controllers/getCode.js";


const router = Router();

router.post('/elementUsageDefs/get', getElementUsageDefs);
router.post('/elementUsageDefs/getFromPosition', getElementUsageDefsFromPosition);
router.post('/elementUsageDefs/getMandatoryElementStatus', getMandatoryElementStatus);
router.post('/elementUsageDefs/getWithCode',getElementUsageDefsWithCode);
router.post('/code/get',getCode);

export default router;
