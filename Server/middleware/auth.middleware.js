import AppError from "../utils/error.js";
import USER from "../models/user.models.js";

import JWT from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new AppError("Unauthenticated, please login", 403)
      );
    }

    const userDetails = JWT.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = userDetails;

    next(); // ✅ Important
  } catch (error) {
    return next(
      new AppError("Invalid or expired token, please login again", 401)
    );
  }
};

const authorizedRoles = (...roles)=>async(req , res , next) =>{
  const currentUserRole = req.user.role;
  if(!roles.includes(currentUserRole)){
    return next (new AppError('You Are Not Authorized To Access This Route !' , 403))
  }
  next();
}

const authorizedSubscriber = async (
  req,
  res,
  next
) => {
  try {
    const user = await USER.findById(req.user.id);

    if (!user) {
      return next(
        new AppError("User not found", 404)
      );
    }

    if (
      user.role !== "ADMIN" &&
      user.subscription?.status !== "active"
    ) {
      return next(
        new AppError(
          "Please Subscribe to access this route",
          403
        )
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
export {
  isLoggedIn,
  authorizedRoles,
  authorizedSubscriber
}

