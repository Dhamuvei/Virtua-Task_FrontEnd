import axios from "axios";
import React, { useState } from "react";
import { BsWindowSidebar } from "react-icons/bs";
import { Link } from "react-router-dom";


const INTIAL_FORM = {
  username: "",
  age :"",
  email: "",
  city: "",
  pincode:"",
  photo:[],
};

const MAIL_FORMAT = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

function Users() {
  const [user, setUser] = useState(INTIAL_FORM);
  const [error, setError] = useState(INTIAL_FORM);



  const setimgfile = (e)=>{
    setUser({...user,photo:e.target.files})
}


  const handleChange = ({ target: { name, value } }) => {
    const err = { ...error };

    switch (name) {
      case "username": {
        if (!value) {
          err.fname = "User Name is required";
        } else {
          err.fname = "";
        }
        break;
      }
      case "age": {
        if (!value) {
          err.age = "age is required";
        } else {
          err.age = "";
        }
        break;
      }
      case "email": {
        if (!value) {
          err.email = "Email is required";
        } else if (!MAIL_FORMAT.test(value)) {
          err.email = "Email is invalid";
        } else {
          err.email = "";
        }
        break;
      }
      case "city": {
        if (!value) {
          err.city = "City is required";
        } else {
          err.city = "";
        }
        break;
      }
      case "pincode": {
        if (!value) {
          err.pincode = "Pin Code is required";
        } else {
          err.pincode = "";
        }
        break;
      }
    }

    setError(err);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createUser();
  };

  const config = {
    headers:{
        "Content-Type":"multipart/form-data"
    }
}
  // Create User
  const createUser = async () => {
    console.log("dhamu" ,user);
    // console.log('photo',file);
    try {
      await axios.post(`http://localhost:3001/create`, user,config);

      setUser(INTIAL_FORM);
      window.location="/MainPage"
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      
            
         <div className="row">
         <div className="col-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fname">
                  User Name<span className="text-danger">*</span>
                  </label>
                  <input
                    name="username"
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    value={user.username}
                    onChange={handleChange}
                    
                    required
                  />
                  <span className="text-danger">{error.username}</span>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="Age">
                  Age<span className="text-danger">*</span>
                  </label>
                  <input
                    name="age"
                    id="age"
                    type="number"
                    className="form-control"
                    placeholder="Enter Your Age"
                    value={user.age}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger">{error.age}</span>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="email">
                    Email<span className="text-danger">*</span>
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter the email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger">{error.email}</span>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="City">
                    City<span className="text-danger">*</span>
                  </label>
                  <input
                    name="city"
                    id="city"
                    type="text"
                    className="form-control"
                    placeholder="Enter the City"
                    value={user.city}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger">{error.city}</span>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="pincode">
                    Pin Code<span className="text-danger">*</span>
                  </label>
                  <input
                    name="pincode"
                    id="pincode"
                    type="number"
                    className="form-control"
                    placeholder="Enter the Pin Code"
                    value={user.pincode}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger">{error.pincode}</span>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="Photo">
                    Profile Photo<span className="text-danger">*</span>
                  </label>
                  <input
                    name="photo"
                    id="photo"
                    type="file"
                    multiple
                    className="form-control"
                    placeholder="upload image"
                    onChange={setimgfile}
                    required
                  />
                </div>
                <br/>
                <div className="form-group">
                  <button type="reset" className="btn btn-secondary">
                    Reset
                  </button>
                  {"  "}
                  <button type="submit" className="btn btn-success">
                    {user.id ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
          </div>
        </div>
    
  );
}

export default Users;
