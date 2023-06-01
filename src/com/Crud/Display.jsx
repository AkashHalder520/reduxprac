import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productdelete, productdisplay, reset_redirectTood } from "../../Redux/Crudslice";
import { Link } from "react-router-dom";
import SweetAlertComponent from "../SweetAlert/Sweetalert";
import { image } from "../../Helper/Helper";
import { reset_redirectTo } from "../../Redux/Authslice";
import { Pagination } from "@mui/material";

export default function Display() {
  const dispatch = useDispatch();
  const [totalRecords, setPage] = useState()
  console.log(totalRecords,'totalRecords')
  const [delete_id, setDelete_id] = useState();
  const [isDelete, setIsDelete] = useState(false); //for sweetalert
  const { redirectTo } = useSelector((s) => s.auth);
  const { oo,redirectTood,totalpage} = useSelector((s) => s.crud);
  console.log(oo,"kkkkkk")
  useEffect(() => {
    dispatch(productdisplay());
  }, []);
  // console.log(data);
console.log(totalpage,"totalpage")

  let formdata = new FormData();
  formdata.append("id", delete_id);

  const delete_func = () => {
    if (delete_id != "") {
      dispatch(productdelete(formdata)).then(dispatch(productdisplay()));
    }
    setDelete_id("");
    setIsDelete(false);
  };

  useEffect(() => {
    dispatch(reset_redirectTo(null))
  }, [redirectTo])
  useEffect(() => {
    dispatch(reset_redirectTood(null))
  }, [redirectTood])



  const handleChange = (e, pageno) => {
    setPage(pageno);
    dispatch(productdisplay(
      {
        page: pageno,
        perpage: 10

      }));

  };
  return (
    <>
      {/* <div class="container mt-4">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4>Student Details
                  <Link to="/CreateProduct" class="btn btn-primary float-end">Add Product</Link>
                </h4>
              </div>
              <div class="card-body">

                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.data?.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{}</td>
                            
                            <Link href="" class="btn btn-info ">View</Link>
                            <Link to={`/Editproduct/${product._id}`} class="btn btn-success ">Edit</Link>
                            <Link to='' onClick={() => {
                              setDelete_id(product?._id);
                              setIsDelete(true);
                            }} class="btn btn-primary mr">Delete</Link>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
        {isDelete && (
              <SweetAlertComponent
                confirm={delete_func}
                cancle={() => setIsDelete(false)}
                title={"Are you sure?"}
                subtitle={"You will not be able to recover!"}
              />
            )}

      </div> */}
      <h4>
        Product list
        <Link to="/CreateProduct" class="btn btn-primary float-end">
          Add Product
        </Link>
      </h4>
      {/* { oo?.map((item) => {
        return (
          <>
            <div class="card">
              <img
                height="400px"
                width="300px"
                src={item?.image ? image(item?.image) : "error"}
                alt="No Image"
              />

              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <p class="card-text">{item.description}</p>

                <Link
                  to={`/Editproduct/${item._id}`}
                  class="btn btn-success"
                >
                  Edit
                </Link>
                <Link
                  to=""
                  onClick={() => {
                    setDelete_id(item?._id);
                    setIsDelete(true);
                  }}
                  class="btn btn-primary mr"
                >
                  Delete
                </Link>
              </div>
              {isDelete && (
                <SweetAlertComponent
                  confirm={delete_func}
                  cancle={() => setIsDelete(false)}
                  title={"Are you sure?"}
                  subtitle={"You will not be able to recover!"}
                />
              )}
            </div>
          </>
        );
      })} */}
      {oo && Array.isArray(oo) && oo.length !== 0 ? (
            oo?.map((item) => {

              return (
                <>

<div class="card">
              <img
                height="400px"
                width="300px"
                src={item?.image ? image(item?.image) : "error"}
                alt="No Image"
              />

              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <p class="card-text">{item.description}</p>

                <Link
                  to={`/Editproduct/${item._id}`}
                  class="btn btn-success"
                >
                  Edit
                </Link>
                <Link
                  to=""
                  onClick={() => {
                    setDelete_id(item?._id);
                    setIsDelete(true);
                  }}
                  class="btn btn-primary mr"
                >
                  Delete
                </Link>
              </div>
              {isDelete && (
                <SweetAlertComponent
                  confirm={delete_func}
                  cancle={() => setIsDelete(false)}
                  title={"Are you sure?"}
                  subtitle={"You will not be able to recover!"}
                />
              )}
            </div>

                </>
              )
            })

          ) : (
            <>
             <h1>No Data Found</h1>
            </>
          )


          }


{oo.length !== 0 ? (

<Pagination count={totalpage} onChange={handleChange} totalRecords={totalRecords} />

) : (

<>

</>
)}
    </>
  );
}
