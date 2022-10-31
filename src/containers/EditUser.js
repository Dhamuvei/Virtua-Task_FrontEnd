import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const INTIAL_FORM = {
  username: "",
  age: "",
  email: "",
  city: "",
  pincode: "",
};

function EditUser() {
  const [user, setUser] = useState(INTIAL_FORM);
  let {id} = useParams();


  const getUsers = async () => {
    console.log("dhamu", id);
    try {
      const { data } = await axios.get(`http://localhost:3001/get/${id}`);
      setUser(data[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

    //update user
    const updateUser = async ({ username }) => {
      try {
        await axios.put(`http://localhost:3001/update/${id}`,user);
        window.alert(`${username} data have updated
        `)
        window.location ="/MainPage";
      } catch (err) {
        console.error(err.message);
      }
    };
  

  useEffect(() => {
    getUsers();
  }, []);

  console.log(user);
  return (
    <div className="container-fluid">
      <h1></h1>
      <div className="row">
        <h1 style={{ color: "blue" }}>Update User</h1>
        <div className="col-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form className="mt-4">
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
                    onChange={(e) => {
                      setUser({ ...user, ["username"]: e.target.value });
                  }}
                    required
                  />
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
                    onChange={(e) => {
                      setUser({ ...user, ["age"]: e.target.value });
                  }}
                    required
                  />
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
                    onChange={(e) => {
                      setUser({ ...user, ["email"]: e.target.value });
                  }}
                    required
                  />
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
                    onChange={(e) => {
                      setUser({ ...user, ["city"]: e.target.value });
                  }}
                    required
                  />
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
                    onChange={(e) => {
                      setUser({ ...user, ["pincode"]: e.target.value });
                  }}
                    required
                  />
                </div>
              
                <br />
                <div className="form-group">
                  <button type="reset" className="btn btn-secondary">
                    Reset
                  </button>
                  {"  "}
                  <button type="subtmit" className="btn btn-success" onClick={updateUser}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
