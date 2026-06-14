import {model , Schema} from 'mongoose';

const paymentSchema = new Schema ({
    razorpay_payment_id : {
        type : String,
        require : true,
    },
    razorpay_subscription_id :{
        type : String,
        required : true,
    },
    razorpay_signature : {
        type : String,
        required : true,
    }
} , {
    timestamps : true,
})

const PAYMENT = new model("Payment" , paymentSchema);

export default PAYMENT;