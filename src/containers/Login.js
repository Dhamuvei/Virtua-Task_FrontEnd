import React from "react";
import { useForm } from "react-hook-form";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    
    axios.post("http://localhost:3001/register",data)
    .then(res=>{
      
      window.localStorage.setItem("authoraization",(res.data))
      window.location="/MainPage"
      console.log(res);
    }).catch(err=>{
    })
  };
  return (

    <div className=" container-fluid">
            <div className="container">
          <div className="row">
            <div className="col-xs-2 col-md-4 col-sm-6 col-lg-5 mx-auto">

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="creat-acc-icon"><FaUsers/></div>

          <div>
            <p> Buyer-Login </p>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              placeholder="password"
              {...register("password", {
                required: "minimum six letters",
              })}
            />
          </div>

          <div className="form-group">
            <button type="subtmit" className="btn btn-primary">
              submit
            </button>
            <hr />
            <p>
              New user need to....
               <Link style={{textDecorationLine:"none"}} to="/Register">CreateAccount</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}
export default Login;