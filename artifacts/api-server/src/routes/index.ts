import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import productsRouter from "./products.js";
import authRouter from "./auth.js";
import cartRouter from "./cart.js";
import ordersRouter from "./orders.js";
import reviewsRouter from "./reviews.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(authRouter);
router.use(cartRouter);
router.use(ordersRouter);
router.use(reviewsRouter);

export default router;
