import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../service/auth-service";

// Get user from session
const username = localStorage.getItem("username");

// Register User
export const register = createAsyncThunk(
  "service/signup",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "service/login",
  async (user, thunkAPI) => {
    try {
      const data = await authService.login(user);
      console.log(data);
      if (data && data.status === "NOT_VERIFIED")
        return thunkAPI.rejectWithValue("User Not Verified Yet");
      return data;
    } catch (error) {
      console.log("CAUGHT IN ERROR");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "service/logout",
  async (payload, thunkAPI) => {
    try {
      await authService.logout();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verify = createAsyncThunk(
  "service/verify",
  async (payload, thunkAPI) => {
    try {
      const data = await authService.verify(payload);
      if (data.status === "ERROR")
        return thunkAPI.rejectWithValue("Verification Failed");
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: username ? username : null,
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    status: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isSuccess = true;
        state.username = action.payload.username;
        state.status = action.payload.status;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.username = null;
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.status = action.payload.status;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// export const authActions = authSlice.actions;
export const { reset } = authSlice.actions;
export default authSlice;
