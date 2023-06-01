import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";



const initialState = {
  upload_status: "idle",
  // upload_message: "idle",
  status: "idle",
  login_status: "idle",
  des: [],
  isloggedIn: false,
  redirectTo: null,
  redirectToo:null,
  Logout:false
};


export const register = createAsyncThunk(
  "register",

  async (formData) => {
    let res = await axiosInstance.post(`user/signup`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const login = createAsyncThunk(
  "login",

  async (formData) => {
    let res = await axiosInstance.post(`user/signin`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const Authslice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    reset_redirectTo: (state, { payload }) => {
      state.redirectTo = payload;
    },
    reset_redirectToo: (state, { payload }) => {
      state.redirectToo = payload;
    },

    handleLogout: (state, { payload }) => {
      localStorage.removeItem("token");
      state.Logout = false;
    },

   
    checkToken: (state, { payload }) => {
      localStorage.getItem("token");
      state.Logout = true;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload?.status === 200) {
          // state.isloggedIn=true

          localStorage.setItem("first_name", payload?.data.first_name);
          state.redirectToo = "/";
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(login.pending, (state, action) => {
        state.login_status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          localStorage.setItem("token", payload?.token);
          state.redirectTo = "/Display";
          state.Logout = true;
        }
      })
      .addCase(login.rejected, (state, action) => {});
  },
});

export const {checkToken, handleLogout, reset_redirectTo,reset_redirectToo} = Authslice.actions;


