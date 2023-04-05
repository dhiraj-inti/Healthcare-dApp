import React, {useState, useContext, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/users/userContext";
export const UserLogin = (props) => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const {login,getUser} = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  useEffect(() => {
    async function init(){
      if(localStorage.getItem('token')){
        const user = await getUser(localStorage.getItem('token'));
        if(user._id){
          navigate("/user");
        }
        else{
          navigate("/userlogin");
        }
        
        console.log(user)
      }
    }

    init();
  },[])
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await login(credentials.email, credentials.password);
    
    if(response.success){
      navigate("/user");
      localStorage.setItem('token', response.authtoken)
    }
    else{
      navigate("/userlogin")
    }
    
  };
  return (
    <>
      <h2 style={{ justifyContent: "center", display: "flex" }}>
        Welcome, {props.name}
      </h2>
      {/* <Form style={{ position: "absolute", left: "40%" }}>
        <Form.Group classNameName="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <input type="email" classNameName="form-control" placeholder="Enter email"/>
          <Form.Text classNameName="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group classNameName="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={redirectToHome}>
          Submit
        </Button>
      </Form> */}
      <form
        style={{ position: "absolute", left: "40%" }}
        onSubmit={onSubmit}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
