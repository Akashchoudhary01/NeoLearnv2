import { razorpay } from "../index.js";
import PAYMENT from "../models/payment.model.js";
import USER from "../models/user.models.js";
import crypto from "crypto";
import AppError from "../utils/error.js";
const getRazorpayKey = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Razorpay-API-key",
    key: process.env.RAZORPAY_KEY_ID,
  });
};
const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await USER.findById(id);
    if (
      user.subscription?.id &&
      ["created", "active"].includes(user.subscription.status)
    ) {
      return next(
        new AppError("You already have an active/pending subscription", 400),
      );
    }

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    return next(new AppError(error.message, 400));
  }
};
const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    const user = await USER.findById(id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(
        `${razorpay_payment_id}|${razorpay_subscription_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Signature mismatch", 400));
    }

    await PAYMENT.create({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    });

    user.subscription.status = "active";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
const cancelSubscription = async (req, res, next) => {
  const { id } = req.user;
  const user = await USER.findById(id);

  if (!user) {
    return next(new AppError("User not found !", 404));
  }

  if (user.role === "ADMIN") {
    return next(new AppError("Admin cannot purchase a subscription", 400));
  }

  try {
    const subscriptionId = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription Canceled  Successfully !",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
const allPayments = async (req, res, next) => {
  const { count, skip } = req.query;

  // Find all subscriptions from razorpay
  const payments = await razorpay.subscriptions.all({
    count: count ? count : 10, // If count is sent then use that else default to 10
    skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const monthlyWisePayments = payments.items.map((payment) => {
    // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
    const monthsInNumbers = new Date(payment.start_at * 1000);

    return monthNames[monthsInNumbers.getMonth()];
  });

  monthlyWisePayments.map((month) => {
    Object.keys(finalMonths).forEach((objMonth) => {
      if (month === objMonth) {
        finalMonths[month] += 1;
      }
    });
  });

  const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });

  res.status(200).json({
    success: true,
    message: "All payments",
    payments,
    finalMonths,
    monthlySalesRecord,
  });
};

export {
  getRazorpayKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
};
