import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import axios from "axios";

function MainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(users);
  const [pageIndex, setPageIndex] = useState(1);
  // const currentPage = (parseInt(req.params.currentPage) - 1) * 3;

  // Get User
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3001/users/get", {
        params: {
          currentPage: (pageIndex - 1) * 3,
        },
      });
      setIsLoading(false);
      setUsers(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Delete user
  const deleteUser = async ({ username, id}) => {
    window.alert(`${username} data will be deleted`);
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      getUsers();
    } catch (err) {
      console.error(err.message);
    }
  };


  const link = (value) => {
    console.log(value, "ht");
    setPageIndex(value);
  };
 

  useEffect(() => {
    console.log("useEffect");
    getUsers();
  }, [pageIndex]);

  return ( 
<div>
        <div className="container">
          <div className="row">
            <div className="col-xs-2 col-md-4 col-sm-6 col-lg-5 mx-auto">
            {users.map((user) => {
                    return (
                      <div class="card mb-4" >
                        
                        <img variant="top"  className="mt-2" />
                      <img src={`http://localhost:3001/images/${user.photo}`} class="card-img-top" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">{user.username}</h5>
                        <p class="card-text">Age : {user.age}</p>
                        <p class="card-text">E-mail : {user.email}</p>
                        <p class="card-text">City : {user.city}</p>{" "}
                        <Link to={`EditUser/${user.id}`} style={{ color: 'blue', textDecoration: 'inherit'}}>Edit User</Link>{" "}{" "}{" "}
                        <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}> Delete Account</button>
                      </div>
                    </div>
                    );
                  })}

            </div>
          </div>
        </div>

    
      <div className="container">
        <div className="row">
          <div className="col-4" style={{"margin-left":"25px"}}></div>
          <div className="col-3 mt-5">
            <nav aria-label="Page navigation example">
              <ul class="pagination" onChange={link}>
                <li onChange={link}>
                  <a class="page-link btn btn-secondary" href={link}>
                    Previous
                  </a>
                </li>
                <button
                  classname="page-item btn btn-secondary"
                  onClick={() => {
                    link(1);
                  }}
                >
                  1
                </button>
                <button
                  classname="page-item btn btn-secondary"
                  onClick={() => {
                    link(2);
                  }}
                >
                  2
                </button>
                <button
                  classname="page-item btn btn-secondary"
                  onClick={() => {
                    link(3);
                  }}
                >
                  3
                </button>
                <li class="page-item">
                  <a class="page-link btn-light" onClick={link} href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    //update form
  );
}
export default MainPage;
