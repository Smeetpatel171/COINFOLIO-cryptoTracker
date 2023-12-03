import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Tab, Tabs, Form, Button, Alert } from "react-bootstrap";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
const LoginSignup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  //data extarcted from the login form
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  //data extracted from the signup form
  const [signupFormData, setSignupFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //Configuration messages after successful login and sign up.
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  //validation function  for Login
  const [loginFormerr, setLoginFormerr] = useState({});

  const validationlogin = () => {
    let err = {};
    // we will validate each input field over here step by step
    //validation code

    if (loginFormData.email === "") {
      err.email = "E-mail Required !";
    } else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(loginFormData.email)) {
        err.email = "Email not valid!";
      }
    }
    if (loginFormData.password === "") {
      err.password = "password Required !";
    } else {
      if (loginFormData.password.length <= 5) {
        err.password = "password should be Atleast 6 characters!";
      }
    }

    setLoginFormerr({ ...err });
    return Object.keys(err).length < 1;
  };
  //validation function  for signup

  const [signupFormerr, setSignupFormerr] = useState({});
  const validationsignup = () => {
    let err = {};
    // we will validate each input field over here step by step
    //validation code
    if (signupFormData.fullName === "") {
      err.fullName = "Name Required !";
    } else {
      if (signupFormData.fullName.length <= 1) {
        err.fullName = "Name should be atleast 2 character";
      }
    }
    if (signupFormData.email === "") {
      err.email = "E-mail Required !";
    } else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(signupFormData.email)) {
        err.email = "Email not valid!";
      }
    }
    if (signupFormData.password === "") {
      err.password = "password Required !";
    } else {
      if (signupFormData.password.length <= 5) {
        err.password = "password should be Atleast 6 characters!";
      }
    }
    if (signupFormData.confirmPassword === "") {
      err.confirmPassword = "confirmPassword Required !";
    } else {
      if (signupFormData.confirmPassword !== signupFormData.password) {
        err.confirmPassword = "password and confirm password deos not match !";
      }
    }

    setSignupFormerr({ ...err });
    return Object.keys(err).length < 1;
  };
  //functions runs after submiting the login and signup form.
  const [firebaseLoginErr, setFirebaseLoginErr] = useState();
  const [firebaseSignupErr, setFirebaseSignupErr] = useState();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let isValid = validationlogin();
    if (isValid) {
      try {
        const result = await signInWithEmailAndPassword(
          auth,
          loginFormData.email,
          loginFormData.password
        );
        console.log(result);
        setMessage("Login successful");
        setShowMessage(true);
        setFirebaseLoginErr("");
        navigate("/profile");
      } catch (error) {
        console.log(error);
        setFirebaseLoginErr(error.message);
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const isvalid = validationsignup();
    if (isvalid) {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          signupFormData.email,
          signupFormData.password
        );
        console.log(result);

        setMessage("Account created successfully");
        setShowMessage(true);
        setFirebaseSignupErr("");
        navigate("/profile");
      } catch (error) {
        console.log(error);
        setFirebaseSignupErr(error.message);
      }
    }
  };
  const googleProvider = new GoogleAuthProvider();

  const handlegooglesignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
        setFirebaseSignupErr("");
        navigate("/profile");
      })
      .catch((err) => {
        setFirebaseSignupErr(err.message);
      });
  };
  //============================================
  return (
    <div className="loginsignup-page">
      <div className="auth-container">
        <Tabs activeKey={activeTab} onSelect={handleTabChange}>
          <Tab eventKey="login" title="Login">
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="email">
                <Form.Control
                  placeholder="Enter email"
                  value={loginFormData.email}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      email: e.target.value,
                    })
                  }
                />
                <span className="formhandle">{loginFormerr.email}</span>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={loginFormData.password}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      password: e.target.value,
                    })
                  }
                />
                <span className="formhandle">{loginFormerr.password}</span>
              </Form.Group>
              <span className="formhandle">{firebaseLoginErr}</span>
              <span className="formhandle">{firebaseSignupErr}</span>
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </Form>
            <div className="googlebutton">
              <div>OR</div>
              <GoogleButton onClick={handlegooglesignIn}></GoogleButton>
            </div>
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <Form onSubmit={handleSignupSubmit}>
              <Form.Group controlId="fullName">
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={signupFormData.fullName}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      fullName: e.target.value,
                    })
                  }
                />
                <span className="formhandle">{signupFormerr.fullName}</span>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control
                  placeholder="Enter email"
                  value={signupFormData.email}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      email: e.target.value,
                    })
                  }
                />
                <span className="formhandle">{signupFormerr.email}</span>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={signupFormData.password}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      password: e.target.value,
                    })
                  }
                />
                <span className="formhandle">{signupFormerr.password}</span>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={signupFormData.confirmPassword}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <span className="formhandle">
                  {signupFormerr.confirmPassword}
                </span>
              </Form.Group>

              <span className="formhandle">{firebaseSignupErr}</span>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
           
          </Tab>
        </Tabs>
        {showMessage && <Alert variant="success">{message}</Alert>}
        <div className="toggle-tab">
          {activeTab === "login" ? (
            <p>
              Not have an account yet?{" "}
              <span onClick={() => handleTabChange("signup")}>
                Click here to sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => handleTabChange("login")}>
                Click here for login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
