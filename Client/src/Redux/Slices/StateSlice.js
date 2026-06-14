import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import AxiosInstance from "../../Helpers/AxiosInstance";

const initialState = {
  allUsersCount: 0,
  SubscribedCount: 0,
};

export const getStateData = createAsyncThunk("stats/get", async () => {
  try {
    // Toast promise needs a pure promise to track loading/success/error properly.
    const responsePromise = AxiosInstance.get("/admin/stats/users");
    
    toast.promise(responsePromise, {
      loading: "Loading the data...",
      success: (data) => {
        return data?.data?.message || "Data loaded successfully";
      },
      error: "Failed to load the data",
    });

    const response = await responsePromise;
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    throw error; // Important to throw so the rejected case triggers if handled later
  }
});

const statSlice = createSlice({
  name: "stat", // Changed from "state" to "stat" to match your useSelector(state => state.stat)
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStateData.fulfilled, (state, action) => {
      // FIX: Used semicolons instead of commas 
      console.log("data" , action.payload);
      
      state.allUsersCount = action?.payload?.allUserCount;

      state.SubscribedCount = action?.payload?.
subscribedUserCount
;
    });
  },
});

export default statSlice.reducer;