import * as express from "express"
import AuthRouter from "./authorization-router"

const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.send({
        success: true,
        msg: "Welcome to API v1"
    })
});

router.use('/auth', AuthRouter)

export default router;
