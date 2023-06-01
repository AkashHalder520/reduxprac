import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productcreate } from "../../Redux/Crudslice";
import { useNavigate } from "react-router-dom";

export default function Product_create() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const navigate=useNavigate();
  const {redirectTood} = useSelector((state) => state.crud);
  const [img, setImage] = useState();
  const dispatch = useDispatch();
  const handelChange = (event) => {
    // console.log(event.target);
    let name = event.target.name;
    let value = event.target.value;
    if (name === "title") {
      if (value.length == 0) {
        setData({ ...data, title: "" });
      } else {
        setData({ ...data, title: value });
      }
    }

    if (name === "description") {
      if (value.length == 0) {
        setData({ ...data, description: "" });
      } else {
        setData({ ...data, description: value });
      }
    }
  };
  const sendData=(event)=>{
    event.preventDefault();
    let formdata= new FormData();
    formdata.append("title",data.title)
    formdata.append("description",data.description)
    formdata.append("image",img)
    dispatch(productcreate(formdata))
  }

  const RedirectUser = () => {
    let title = localStorage.getItem("title");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/createproduct";

    if (title !== null && title !== undefined && title !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/Display");
    }
};
useEffect(() => {
  RedirectUser()
  }, [redirectTood])

  return (
    <>
      <div id="container">
        <h1 id="form-title">Create</h1>
        <form onSubmit={sendData}>
          <div id="main-user-info">
            <div id="user-input-box">
              <label for="fullName">Title</label>
              <input
                type="text"
                id="fullName"
                name="title"
                placeholder="Enter Title"
                onChange={handelChange}
              />
            </div>

            <div id="user-input-box">
              <label for="description">Description</label>
              <input
                type="text"
                id="email"
                name="description"
                placeholder="Enter description"
                onChange={handelChange}
              />
            </div>
            {/* <div id="user-input-box">
              <label for="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phone"
                placeholder="Enter Phone Number"
                value={user.phone}
                onChange={handelChange}
              />
            </div>

            <div id="user-input-box">
              <label for="address">address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="address"
                value={user.address}
                onChange={handelChange}
              />
            </div>
            <div id="user-input-box">
              <label for="city">city</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                value={user.city}
                onChange={handelChange}
              />
            </div>

            <div id="user-input-box">
              <label for="class">class</label>
              <input
                type="number"
                id="class"
                name="class"
                placeholder="Enter "
                value={user.class}
                onChange={handelChange}
              />
            </div> */}
          </div>
          <div>
            <label>Img</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              name="img"
              accept="image/*"
              class="form-control"
            />
          </div>
          <div id="form-submit-btn">
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
