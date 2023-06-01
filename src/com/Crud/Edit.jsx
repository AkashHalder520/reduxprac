import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productdetails, productupdate } from "../../Redux/Crudslice";
import { image } from "../../Helper/Helper";

export default function Edit() {
  const productid = useParams();
  const dispatch = useDispatch();
  // console.log(productid);
  // const formdata=new FormData()
  // formdata.append()
  useEffect(() => {
    dispatch(productdetails(productid));
  }, [productid]);
  const {details} = useSelector((state) => state.crud);
  // console.log(proddata.data.data._id);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [img, setImage] = useState();
  useEffect(() => {
    if (details != "") {
      setData({
        title: details.title,
        description: details.description,
      });
      
    }
  }, [details]);

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
  const sendData = (event) => {
    event.preventDefault();
    let formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("image", img);
    formdata.append("id", details?._id);
    dispatch(productupdate(formdata));
  };
  return (
    <>
      <div id="container">
        <h1 id="form-title">Edit page</h1>
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
                value={data.title}
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
                value={data.description}
              />
            </div>
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

            {img !== "" && img !== undefined && img !== null ? (
              <img
                height="40px"
                src={URL.createObjectURL(img)}
                alt=""
                className="upload-img"
              />
            ) : (
              <>
                {details?.image === "" ? (
                  <img
                    height="70px"
                    // src={image}
                    alt=""
                    className="upload-img"
                  />
                ) : (
                  <img
                    height="60px"
                    src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${details?.image}`}
                    alt=""
                    className="upload-img"
                  />
                )}
              </>
            )}
            {img === "" && <p>Drag or drop content here</p>}
          </div>
          <div id="form-submit-btn">
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
    // <>Edit page</>
  );
}
