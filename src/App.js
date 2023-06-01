import logo from "./logo.svg";
import "./App.css";
import {useEffect}from 'react'
import Footer from "./Common/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../src/Common/Header/Header";
import Login from "./com/Auth/Login/Login";

import Registration from "../src/com/Auth/Registration/Registration";
import Product_create from "./com/Crud/Product_create";
import Display from "./com/Crud/Display";
import Edit from "./com/Crud/Edit";
import { checkToken } from "./Redux/Authslice";
function App() {
  const dispatch=useDispatch()
  function PrivateRoute({ children }) {
    console.log(children, "children");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // useEffect(() => {
    //   localStorage.setItem("pathname", location?.pathname);
    // }, [location]);

    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("Please go for login either you can't access product list")}
      </>
    );
  }


useEffect(() => {
dispatch(checkToken())
}, [])

  const PublicRouteNames = [
    {
      path: "/Registration",
      Component: <Registration />,
    },
    {
      path: "/",
      Component: <Login />,
    },
    // {
    //   path: "/",
    //   Component: <Home />,
    // },
  ];

  const PrivateRouteNames = [
    {
      path: "/CreateProduct",
      Component: <Product_create />,
    },

    {
      path: "/Display",
      Component: <Display />,
    },

    {
      path: "/Editproduct/:id",
      Component: <Edit />,
    },
  ];
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {PublicRouteNames?.map((route, index) => {
            return <Route exact path={route.path} element={route.Component} />;
          })}

          {PrivateRouteNames?.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={<PrivateRoute>{route.Component}</PrivateRoute>}
              />
            );
          })}
        </Routes>
        <Footer />
      </Router>
      {/* <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Login/>} />
         
          <Route path='/Registration' element={<Registration/>} />
          <Route path='/CreateProduct' element={<Product_create/>} />
          <Route path='/Display' element={<Display/>} />
          <Route path='/Editproduct/:id' element={<Edit/>} />
        </Routes>
        < Footer/>
      </Router> */}
    </div>
  );
}

export default App;
