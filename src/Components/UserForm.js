import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const UserForm = () => {
  
  //====Timer reigon starts==//
  const Ref = useRef(null);
  const [timer, setTimer] = useState("05:00");
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("05:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 300);
    console.log(deadline);
    return deadline;
    
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  //=====Timer reigon ends====//

  //====Initial values for the form====//
  const initialFieldValues = {
    name: "",
    email: "",
    dateOfBirth: "",
    address: "",
    telephone: "",
  };

  const [values, setValues] = useState(initialFieldValues);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    let temp = {};
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (values.name === "") {
      temp.name = "Name is mandetory";
    }
    if (values.email === "") {
      temp.email = "Email is mandetory";
    } else if (!regEx.test(values.email)) {
      temp.email = "Email format is not valid";
    }
    if (values.dateOfBirth === "") {
      temp.dateOfBirth = "Date Of Birth is mandetory";
    }
    if (values.address === "") {
      temp.address = "Address is mandetory";
    }

    if (values.telephone === "") {
      temp.telephone = "Telephone is mandetory";
    } else if (values.telephone.length < 10) {
      temp.telephone = "Telephone is not valid";
    }
    setErrors(temp);
    return Object.keys(temp).length;
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    clearTimer(getDeadTime());
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate() === 0) {
      alert("Form submitted successfully.");
      resetForm();
    }
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <>
      <div className="container col-md-5">
        <div className="container text-center">
          <h2 style={{color:"red"}}>{timer}</h2>
        </div>
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
          <div className="card mt-4">
            <div className="container text-center">
              <p className="lead">User Details</p>
            </div>

            <div className="card-body">
              <div className="form-group  mt-3">
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  className="form-control"
                  name="name"
                  value={values.name || ""}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </div>
              <p style={{color:"red"}}>{errors.name}</p>
              <div className="form-group  mt-3">
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  className="form-control"
                  value={values.email || ""}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </div>
              <p style={{color:"red"}}>{errors.email}</p>
              <div className="form-group  mt-3">
                <TextField
                  id="dateOfBirth"
                  type="date"
                  label=""
                  variant="outlined"
                  name="dateOfBirth"
                  className="form-control"
                  value={values.dateOfBirth || ""}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </div>
              <p style={{color:"red"}}>{errors.dateOfBirth}</p>
              <div className="form-group  mt-3">
                <TextareaAutosize
                  aria-label="Address"
                  id="address"
                  minRows={3}
                  placeholder="Address"
                  className="form-control"
                  variant="outlined"
                  name="address"
                  value={values.address || ""}
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </div>
              <p style={{color:"red"}}>{errors.address}</p>
              <div className="form-group mt-3" style={{ display: "flex" }}>
                <select
                  className="form-control"
                  style={{ width: "20%", marginRight: "1%" }}
                >
                  <option value="IN">+91</option>
                  <option value="AUS">+61</option>
                  <option value="US">+1</option>
                </select>
                <TextField
                  id="telephone"
                  label="Telephone"
                  variant="outlined"
                  name="telephone"
                  className="form-control"
                  value={values.telephone || ""}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </div>
              <p style={{color:"red"}}>{errors.telephone}</p>
              <div className="form-group text-center  mt-3">
                <Button
                  id="btnSignup"
                  type="submit"
                  color="success"
                  variant="contained"
                  disabled={timer==="00:00"}
                  sx={{ textTransform: "none", width: "100%" }}
                >
                  Submit
                </Button>
              </div>
              <div className="form-group text-center  mt-3">
                <Button
                  id="btnReset"
                  type="button"
                  color="primary"
                  variant="contained"
                  sx={{ textTransform: "none", width: "100%" }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
