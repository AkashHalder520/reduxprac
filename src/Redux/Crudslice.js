import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";

const initialState = {
  status: "idle",
  details: [{}],
  oo:[{}],
  redirectTood:null,
  totalpage:""
};
export const productcreate = createAsyncThunk(
  "product-create",

  async (formData) => {
    let res = await axiosInstance.post(`product/create`, formData);

    let resData = res?.data;

    return resData;
  }
);
export const productdisplay = createAsyncThunk(
  "displayproduct",

  async (formdata) => {
    let res = await axiosInstance.post(`product/list`,formdata);

    let resData = res?.data;

    return resData;
  }
);
export const productdelete=createAsyncThunk(
  "delete_product",
   
  async(id)=>{
    console.log("productid=",id);
    let res= await axiosInstance.post(`product/remove/`,id);
    let resData= res?.data
    return resData
   }  
)

export const productdetails=createAsyncThunk(
  "product_details",
   
  async({id})=>{
    console.log("productid",id);
    let res= await axiosInstance.get(`product/detail/${id}`);
    let resData= res?.data
    return resData
   }  
)
export const productupdate=createAsyncThunk(
  "product_update",
  async(formData)=>{
    let res=axiosInstance.post(`product/update`,formData)
    let resData=res?.data
    return resData
  }
)


export const CrudSlice = createSlice({
  name: "crud_product",
  initialState,
  reducers:{
    reset_redirectTood: (state, { payload }) => {
      state.redirectTood = payload;
    
    },

    handleCreate: (state, { payload }) => {
      localStorage.removeItem("title");

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productcreate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productcreate.fulfilled, (state, {payload}) => {
        state.status = "fulfilled";
        localStorage.setItem("title", payload?.data.title);
        state.redirectTood='/Display'
      })
      .addCase(productcreate.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(productdisplay.pending, (state, action) => {
        state.status = "loading";
        console.log('pending');
      })
      .addCase(productdisplay.fulfilled, (state, {payload}) => {
        state.status = "fulfilled";
        state.oo = payload.data
        state.totalpage=payload.totalPages
      })
      .addCase(productdisplay.rejected, (state, action) => {
        state.status = "rejected";
        console.log('rjected');
      })

      .addCase(productdelete.pending, (state, action) => {
        state.status = "loading";
        console.log('pending');
      })
      .addCase(productdelete.fulfilled, (state, {payload}) => {
        state.status = "fulfilled";
        state.oo = payload.data //payload data is empty so state => empty
        // console.log(action.payload);
        // state.data = action.payload
      })
      .addCase(productdelete.rejected, (state, action) => {
        state.status = "rejected";
        console.log('rjected');
      })

      .addCase(productdetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productdetails.fulfilled, (state,{payload}) => {
        state.status = "fulfilled";
        // console.log(action.payload);
        state.details=payload.data
      })
      .addCase(productdetails.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(productupdate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productupdate.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // console.log(action.payload);
        // state.data=action.payload
      })
      .addCase(productupdate.rejected, (state, action) => {
        state.status = "rejected";
      })

  },
});
export const {handleCreate,reset_redirectTood} = CrudSlice.actions;
