import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox,
    MDBFile
}
    from 'mdb-react-ui-kit';
import img1 from './lino-lgYWrWl_7Fs-unsplash.jpg'
import { register, signiup } from '../../../Redux/Authslice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';



export default function Registration() {
const navigate=useNavigate()
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })
    const [profile_pic, setProfile_pic] = useState()
    const [error,setError]=useState({})
    const dispatch=useDispatch()
    const {redirectToo} = useSelector((state) => state.auth);

    const handelchange = (event) => {

        let name = event.target.name;
        let value = event.target.value;
        if (name === "email") {
            if (value.length == 0) {
                setError({ ...error, email: "@Email is Required" });
                setUser({ ...user, email: "" });
            } else {
                setError({ ...error, email: "" });
                setUser({ ...user, email: value });
            }
        }
        if (name === "first_name") {
            if (value.length === 0) {
                setError({ ...error, first_name: "@first name required" });
                setUser({ ...user, first_name: "" });
            } else {
                setError({ ...error, first_name: "" });
                setUser({ ...user, first_name: value });
            }
        }
        if (name === "last_name") {
            if (value.length === 0) {
                setError({ ...error, last_name: "@first name required" });
                setUser({ ...user, last_name: "" });
            } else {
                setError({ ...error, last_name: "" });
                setUser({ ...user, last_name: value });
            }
        }
        if (name === "password") {
            if (value.length === 0) {
                setError({ ...error, password: "passwordrequired" });
                setUser({ ...user, password: "" });
            } else {
                setError({ ...error, password: "" });
                setUser({ ...user, password: value });
            }
        }
    }
    const sendData = (e) => {
        e.preventDefault();
        let formData= new FormData();
        formData.append("first_name",user.first_name);
        formData.append("last_name",user.last_name);
        formData.append("email",user.email);
        formData.append("password",user.password);
        formData.append("profile_pic",profile_pic);
        dispatch(register(formData));

    };

    const RedirectUser = () => {
        let first_name = localStorage.getItem("first_name");
        let isInLoginPage = window.location.pathname.toLowerCase() === "/registration";
    
        if (first_name !== null && first_name !== undefined && first_name !== "") {
            // window.location.pathname = getPathname;
            isInLoginPage && navigate("/");
        }
    };
    useEffect(() => {
    RedirectUser()
    }, [redirectToo])

    return (
        <form >
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center justify-content-center' >

                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='First Name' id='form1' type='text' className='w-100' name='first_name' onChange={handelchange} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='Last Name' id='form1' type='text' className='w-100' name='last_name' onChange={handelchange} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='form2' type='email' name='email' onChange={handelchange} />
                            </div>

                            {/* <MDBCol md='6' className='mb-4'>
                <h6 className="fw-bold">Gender: </h6>
                <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Female' inline />
                <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Male' inline />
                <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='Other' inline />
              </MDBCol> */}
                            {/* <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="calendar me-3" size='lg'/>
                <MDBInput label='Date of Birth' id='form2' type='date'/>
              </div> */}

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg' />
                                <MDBInput label='Password' id='form3' type='password' name='password' onChange={handelchange} />
                            </div>

                            {/* <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' id='form4' type='password'/>
              </div> */}

                            {/* <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Mobile' id='form3' type='text'/>
              </div> */}
                            <MDBFile label='Default file input example' id='customFile' />

                            <div className='mb-4'>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' onChange={(e) => setProfile_pic(e.target.files[0])} />
                            </div>

                            <button className='mb-4' size='lg' onClick={sendData}>Register</button>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src={img1} fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
        </form>
    );
}


