import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../Helpers/AxiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayment: {},
  finalMonth: {},
  monthlySalesRecord: [],
};

export const getRazorPayId = createAsyncThunk(
  "/razorpay/getId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        "/payments/razorpay-key"
      );


      return response.data;
    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Failed to load Razorpay key"
      );

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        "/payments/subscribe"
      );


      return response.data;
    } catch (error) {
      

      toast.error(
        error?.response?.data?.message ||
          "Failed to purchase bundle"
      );

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        "/payments/verify",
        data
      );

      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Payment verification failed"
      );

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  "/payments/cancel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        "/payments/unSubscribe"
      );

      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to cancel subscription"
      );

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getPaymentRecord = createAsyncThunk(
  "/payment/record",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/payments?count=100");


      return response.data;
    } catch (error) {

      return rejectWithValue(
        error?.response?.data || { message: "Request failed" }
      );
    }
  }
);
const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getRazorPayId.fulfilled, (state, action) => {
       

        state.key = action?.payload?.key || "";

        // console.log("STATE KEY:", state.key);
      })



     

      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        state.isPaymentVerified =
          action?.payload?.success || false;

        toast.success(
          action?.payload?.message ||
            "Payment verified"
        );
      })

      .addCase(verifyUserPayment.rejected, (state) => {
        state.isPaymentVerified = false;
      })

      .addCase(getPaymentRecord.fulfilled , (state , action)=> 
    {
        state.allPayment = action?.payload?.payments,
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord,
        state.finalMonth = action?.payload?.finalMonth

      })
   
  },
});

export default razorpaySlice.reducer;