import USER from "../models/user.models.js";
import AppError from "../utils/error.js";
import sendEmail from "../utils/sendEmail.js";

const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;
console.log("ContactUs controller reached!");
  if (!name || !email || !message) {
    return next(
      new AppError("All fields are mandatory", 400)
    );
  }

  try {
    const subject = "contact-us-form";

    const textMessage = `
      Name: ${name}<br/>
      Email: ${email}<br/>
      Message: ${message}
    `;

    await sendEmail(
      process.env.CONTACT_US_EMAIL,
      subject,
      textMessage
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
 } catch (e) {
  console.error("Error in contactUs:", e); // <--- Add this
  return next(new AppError(e.message, 400));
}
};

const userStats = async(req , res, next)=>{
    try {
        const allUserCount = await USER.countDocuments();
        
        const subscribedUserCount = await USER.countDocuments({
            'subscription.status' : 'active',
        });
        res.status(200).json({
            success: true,
            message: 'All registered users count',
            allUserCount,
            subscribedUserCount,
        });
        
    } catch (e) {
        return next (new AppError(e.message , 400));
        
    }

}
export {
    contactUs,
     userStats
}