import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../Redux/Authslice";
import { useDispatch, useSelector } from "react-redux";
import { handleCreate } from "../../Redux/Crudslice";

export default function Header() {
  const navigate = useNavigate();
  const { Logout } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(handleLogout());
    navigate("/");
  };


  const create = () => {
    dispatch(handleCreate());
    navigate("/CreateProduct");
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        {/* <!-- Container wrapper --> */}
        <div class="container-fluid">
          {/* <!-- Toggle button --> */}
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarRightAlignExample"
            aria-controls="navbarRightAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          {/* <!-- Collapsible wrapper --> */}
          <div class="collapse navbar-collapse" id="navbarRightAlignExample">
            <a class="navbar-brand" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="20"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
            {/* <!-- Left links --> */}
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Registration">
                  register
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link"  onClick={create}to="/CreateProduct">
                  CreateProduct
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Display">
                  Display
                </Link>
              </li>
              {/* <!-- Navbar dropdown --> */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                {/* <!-- Dropdown menu --> */}
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li>
            </ul>

            {/* <button onClick={logout}>Logout</button> */}

            {Logout ? (
              <div>
                <Link onClick={logout} to="/">
                  Logout
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/">Login</Link>
              </div>
            )}
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
    </>
  );
}
