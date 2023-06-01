import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'


import { login, reset_redirectToo } from '../../../Redux/Authslice';
import { MDBIcon, MDBInput } from 'mdb-react-ui-kit';

const Login = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const {redirectTo,redirectToo} = useSelector((state) => state.auth);

  const [user, setUser] = useState({

    email: "",
    password: "",
  });
  const [img, setimg] = useState("");
  const [error, setError] = useState({});
  const validation = () => {
    let error = {};


    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    )
      if (!user.password) {
        error.password = "Password  is Required";
      }

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;


    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password name is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };





  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());
    let formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    dispatch(login(formData));
  };


  const RedirectUser = () => {
    let token = localStorage.getItem("token");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/";

    if (token !== null && token !== undefined && token !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/Display");
    }
};

useEffect(()=>{
  RedirectUser()
},[redirectTo])


useEffect(() => {
  dispatch(reset_redirectToo(null))
}, [redirectToo])

  return (
    <>
      {/* <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" onChange={postUserData} class="form-control" name='email' />
          <span style={{ color: "red", marginLeft: "24px" }}>
            {" "}
            {error.email}{" "}
          </span>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input onChange={postUserData}  class="form-control" name="password" />
          <span style={{ color: "red", marginLeft: "24px" }}>
            {" "}
            {error.password}{" "}
          </span>

          <br />

        </div>

        <button type="submit" onClick={SubmitInfo} class="btn btn-success">Login</button>
      </form> */}

<div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput   label='Your Email' id='form2' type='email' name='email' onChange={postUserData} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='form2' type='password' name='password' onChange={postUserData} />
                            </div>
                            <button onClick={SubmitInfo}>Button</button>
    </>
  )
}

export default Login
