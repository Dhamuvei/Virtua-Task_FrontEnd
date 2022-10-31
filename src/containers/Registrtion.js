import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import Joi from "joi";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
password: Joi.string().alphanum().min(6).max(10).required(),

});

const INTIAL_FORM = {
email: "",
 password: "",
};

function Users() {
  const validate = (values) => {
    console.log("from validate", values);
    const errors = {};

    const { error } = userSchema.validate(values);
    if (error) {
      const [err] = error.details;
      errors[err.context.key] = err.message;
    }

    return errors;
  };


  return (
    <>
    
    <div className="container">
          <div className="row">
            <div className="col-xs-2 col-md-4 col-sm-6 col-lg-5 mx-auto">
    <div className="card">

      <div className="card-body">
        <Formik
          initialValues={INTIAL_FORM}
          validate={validate}
          onSubmit={async (values) => {
            console.log("onsubtmit", values);
            const { error } = userSchema.validate(values);
            if (!error) {
              try {
                const URL = "http://localhost:3001/register";
                // Register api call
                await axios.post(`${URL}`, values);
                // send mail to user api call
                window.location="/Login";
              } catch ({ response: { data } }) {

              }
            }
          }}
        >
          {() => {
            return (
              <Form className="mt-4">
                <div className="creat-acc-icon">
                  {/* <FaUsers /> */}
                </div>
                <div >
                  <p> create Account </p>
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email<span className="text-danger">*</span>
                  </label>
                  <Field
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Enter the email"
                  />
                  <ErrorMessage className="text-danger" name="email" />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="password">
                    Password<span className="text-danger">*</span>
                  </label>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Enter the password"
                  />
                  <ErrorMessage className="text-danger" name="password" />
                </div>
                <br />
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create Account
                  </button>
                  {"  "}
                  <hr />
                  <p className="forgot-password text-right">
                    Alredy have an account go to...
                    <Link style={{textDecorationLine:"none"}} to="/">Login</Link>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Users;