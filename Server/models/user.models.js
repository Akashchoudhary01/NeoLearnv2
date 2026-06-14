import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minLength: [5, "name must be at least 2 characters"],
      maxLength: [50, "name should be less then 50 characters"],
      required: [true, "Name is Required"],
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Email is Required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    password: {
      type: String,
      required: [true , "Password is Required"],
      minLength: [8 , "Password must be at least 8 characters"],
      select : false
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    avatar : {
        public_id :{
            type : String
        },
        secure_url :{
            type : String
        }
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
    subscription : {
      id : String,
      status : String,
  
    },
  },
  {
    timestamps: true,
  },
);


//Password encrypt using BCRYPT
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
       return next;
    }
    this.password = await bcrypt.hash(this.password , 10);
})

//JWT Token generate
userSchema.methods = {
  generateJWTtoken: function () {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
        subscription: this.subscription,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  comparePassword : async function(planTextpassword){
    return await bcrypt.compare(planTextpassword , this.password)
  },
  generateResetPasswordToken : async function (){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    this.forgotPasswordExpiry = Date.now() +10 * 60 * 1000; //10 minute from now

    return resetToken;
  }
};


const USER = model("user", userSchema);

export default USER;
