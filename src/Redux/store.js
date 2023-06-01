import { configureStore } from "@reduxjs/toolkit";
import { Authslice } from "./Authslice";
import { CrudSlice } from "./Crudslice";


// import {authslice} from "./authslice"

export const store = configureStore({
  reducer: {
    auth:Authslice.reducer,
    crud:CrudSlice.reducer
  },

});