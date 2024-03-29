import axios from "axios";
//let adminUrl = "https://backendapinodejsraju.herokuapp.com/api/";
let adminUrl = "https://wtsacademy.dedicateddevelopers.us/api/";

// let adminUrl="https://jsonplaceholder.typicode.com/"
// let frontEndUrl = "https://backendapinodejsraju.herokuapp.com/";
// let adminUrl="http://10.2.0.166:1577/"
if (process.env?.REACT_APP_ENV === "production") {
 //adminUrl = "https://backendapinodejsraju.herokuapp.com/api/"; //change when app goes live
 adminUrl = "http://localhost:2000/api/"; //change when app goes live
  // frontEndUrl = "https://jsonplaceholder.typicode.com/"; //change when app goes live
}
export const image = (media) => {
  return `https://wtsacademy.dedicateddevelopers.us`+`/uploads/product/${media}`;
}

export const baseURL = adminUrl
export const course_storagePath = baseURL + "/storage/";
let axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export const fetchBaseQueryInstance = () => {
  return {
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set(
        "x-access-token",
        localStorage.getItem("token") || sessionStorage.getItem("token")
      );

      return headers;
    },
  };
};
export default axiosInstance;
