import USER from "../models/user.models.js";
import AppError from "../utils/error.js";
import cloudinary from "cloudinary";
import fs from "fs";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
   sameSite: "none",
  secure: true,
};
///////////////////
// register
///////////////////
const register = async (req, res, next) => {
  try {
    const { fullName, email, password, avatar } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return next(new AppError("Every field is required", 400));
    }

    // Check existing user
    const userExists = await USER.findOne({ email });

    if (userExists) {
      return next(new AppError("Email already registered", 400));
    }

    // Create user
    const user = await USER.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: "default",
        secure_url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      },
    });

    // Upload avatar if exists
    // console.log("File:", req.file);


    if (req.file) {
      try {
        
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "neoLearn",
          width: 250,
          height: 250,
          gravity: "face",
          crop: "fill",
        });
        
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;
          
          await user.save(); // ✅ save avatar
         if (fs.existsSync(req.file.path)) {
      await fs.promises.unlink(req.file.path);
    }
        }
      } catch (e) {
        return next (new AppError(e.message , 400));
        
      }
    }

    if (!user) {
      return next(
        new AppError("User registration failed, please try again", 400),
      );
    }

    // Hide password
    user.password = undefined;

    // Generate token
    const token = user.generateJWTtoken();

    // Send cookie
    res.cookie("token", token, cookieOption);

    // ✅ IMPORTANT: return
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    return next(error);
  }
};

///////////////login/////////////////

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Every field is mandatory", 400));
    }

    const user = await USER.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = user.generateJWTtoken();

    // Hide password
    user.password = undefined;

    // Send cookie
    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

///////////////logout/////////////////
const logout = (req, res) => {
  res.cookie("token", null, {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully!",
  });
};

///////////////getprofile/////////////////
const getprofile = async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await USER.findById(userID);

    res.status(200).json({
      success: true,
      message: "user details",
      user,
    });
  } catch (e) {
    return next(new AppError("Failed to fetch Profile", 400));
  }
};

/////////////////
//Forgot-password

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is Required"), 400);
  }

  const user = await USER.findOne({ email });

  if (!user) {
    return next(new AppError("Email is not Registered"), 400);
  }

  const userToken = await user.generateResetPasswordToken();

  await user.save();

  //
  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${userToken}`;

  const subject = "reset Password";
  const message = `You Can Reset Your Password By Clicking ${resetPasswordURL}`;

  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset Password Token Has Been Send To ${user.email} successfully`,
    });
  } catch (e) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();
    return next(new AppError(e.message), 500);
  }
};
const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await USER.findOne({
    forgotPasswordExpiry: { $gt: Date.now() },
    forgotPasswordToken,
  });

  if (!user) {
    return next(new AppError("Token Expired ! Please Try Again"), 400);
  }

  user.password = password;
  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Your Password Changed SuccessFully !",
  });
};

const ChangePassword = async(req , res , next)=>{
  const {oldPassword , newPassword} = req.body;
const userID = req.user.id;
    

  if(!oldPassword || !newPassword){
    return next(new AppError('Every Field is Mendatory' , 400));
  }
  const user = await USER.findById(userID).select('+password');

  if(!user){
    return next (new AppError('User does Not exists' , 400) );
  }
  console.log("oldPassword" , oldPassword);
  console.log("new Password" , newPassword);
  

  const isPasswordValid = await user.comparePassword(oldPassword);

  if(!isPasswordValid){
    return next (new AppError('Invalid Password' ,400));
  }
  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success : true,
    message : 'password changes Successfully'
  })

}

const updateProfile = async (req, res, next) => {
    console.log("req.body =", req.body);
  console.log("req.file =", req.file);
  const { fullName } = req.body;
  const {role} = req.body;
  const userId = req.user.id;

  const user = await USER.findById(userId);

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  // Update name
  if (fullName) {
    user.fullName = fullName;
  }
  if(role){
    user.role = role;
  }

  // If new image uploaded
  if (req.file) {

    // ✅ Delete old image only if exists
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "neoLearn",
        width: 250,
        height: 250,
        gravity: "face",
        crop: "fill",
      });

      if (result) {

        // ✅ Create avatar object
        user.avatar = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };

        await user.save();
        
        if (fs.existsSync(req.file.path)) {
      await fs.promises.unlink(req.file.path);
    }
      }
      
    } catch (e) {
      return next(new AppError(e.message, 400));
    }
  }
  
  await user.save();




  
  // ✅ Send response (you were missing this)
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};




export { register, login, logout, getprofile, forgotPassword, resetPassword , ChangePassword , updateProfile};
