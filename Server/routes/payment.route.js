import { Router } from "express";
import {
  allPayments,
  buySubscription,
  cancelSubscription,
  getRazorpayKey,
  verifySubscription,
} from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/razorpay-key" , isLoggedIn, getRazorpayKey);

router.post("/subscribe" , isLoggedIn, buySubscription);

router.post("/verify" , isLoggedIn, verifySubscription);

router.post( "/unSubscribe" , isLoggedIn, cancelSubscription);

router.get( "/" , isLoggedIn, authorizedRoles("ADMIN"), allPayments);

export default router;
