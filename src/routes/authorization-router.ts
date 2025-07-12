import * as express from "express"
import { refreshToken, signToken } from "../controller/AuthController";

const router = express.Router();

router.post('/sign', signToken);
router.get('/refresh/token', refreshToken);

export default router;