import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import AxiosInstance from "../../Helpers/AxiosInstance";

const getStoredData = () => {
  try {
    const data = localStorage.getItem("data");

    if (!data || data === "undefined") {
      return {};
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing localStorage data:", error);

    localStorage.removeItem("data");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    return {};
  }
};

const InitialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: getStoredData(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle createAccount async thunk
    builder
      //for registration
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;

        const userData = action.payload?.user || action.payload?.data || {};

        state.data = userData;
        state.role = userData?.role || "USER";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", state.role);
        localStorage.setItem("data", JSON.stringify(userData));
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
      });

    //for Login
    builder
      .addCase(LoginAc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginAc.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;

        const userData = action.payload?.user || action.payload?.data || {};

        state.data = userData;
        state.role = userData?.role || "USER";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", state.role);
        localStorage.setItem("data", JSON.stringify(userData));
      })
      .addCase(LoginAc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
      });

    // ========== LOGOUT ==========
    builder
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        state.error = null;
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("data");
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("data");
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;

        const userData = action.payload?.user || action.payload?.data || {};

        state.data = userData;
        state.role = userData?.role || "USER";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", state.role);
        localStorage.setItem("data", JSON.stringify(userData));
      });
  },
});

// ✅ Async Thunk of regestrartion
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = await AxiosInstance.post("user/register", data);
    toast.success(res?.data?.message || "Account created successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create account");
    throw error;
  }
});
// ✅ Async Thunk for login
export const LoginAc = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = await AxiosInstance.post("user/login", data);
    toast.success(res?.data?.message || "User LoggedIn  successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to Loggenin ");
    throw error;
  }
});
// Async Thunk for logout
export const Logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = await AxiosInstance.get("user/logout");
    toast.success(res?.data?.message || "User Logout successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to Logout ");
    throw error;
  }
});

// Update Profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async ({ id, formData }, thunkAPI) => {
    const res = await AxiosInstance.put(`/user/update/${id}`, formData);
    toast.success(res.data.message);
    return (await res).data;
  },
);

// Async Thunk for Change Password
export const ChangePasswordThunk = createAsyncThunk(
  "/password/changePassword",
  async (data) => {
    // Pass the promise itself to the toast, do not await it first
    const promise = AxiosInstance.post("/user/changepassword", data);

    toast.promise(promise, {
      loading: "Changing password...",
      success: (res) => res.data?.message || "Success",
      error: (err) =>
        err.response?.data?.message || "Failed to change password",
    });

    const res = await promise;
    return res.data;
  },
);

//Async thunk for forgot password

export const ForgotPasswordThunk = createAsyncThunk(
  "/password/reset",
  async (data, { rejectWithValue }) => {
    try {
      const request = AxiosInstance.post("/user/reset", data);

      toast.promise(request, {
        loading: "Sending Email...",
        success: (res) =>
          res.data?.message || "Reset password mail sent successfully",
        error: (err) => err.response?.data?.message || "Failed to send email",
      });

      const response = await request;
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Reset Password Thunk
export const resetPassword = createAsyncThunk(
  "/password/reset-password",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(`/user/reset/${token}`, {
        password,
      });

      toast.success(res.data.message);

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");

      return rejectWithValue(error.response.data);
    }
  },
);
// fetch new userData
export const getUserData = createAsyncThunk("user/details", async () => {
  try {
    const res = await AxiosInstance.get("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

export default authSlice.reducer;
