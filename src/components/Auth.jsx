import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";

import signInImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchMode = () => {
    setIsSignup((prevSignup) => !prevSignup);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, password, phoneNumber, avatarURL } = form;

    const url = "https://bsf-chat-app.herokuapp.com/auth";

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${url}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  type: "easeInOut",
                  duration: 0.5,
                }}
              >
                <p>Sign Up</p>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    name="fullName"
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="username">Username</label>
                  <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    name="phoneNumber"
                    id="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="avatarURL">Avatar URL</label>
                  <input
                    name="avatarURL"
                    id="avatarURL"
                    type="text"
                    placeholder="Avatar URL"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_button">
                  <button>
                    {loading ? (
                      <TailSpin width={18} height={18} color="#fff" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
                <div className="auth__form-container_fields-account">
                  <p>
                    {isSignup
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <span onClick={switchMode}>Sign In</span>
                  </p>
                </div>
              </motion.div>
            )}

            {!isSignup && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  type: "easeInOut",
                  duration: 0.5,
                }}
              >
                <p>Sign In</p>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="username">Username</label>
                  <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_button">
                  <button>
                    {loading ? (
                      <TailSpin width={18} height={18} color="#fff" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
                <div className="auth__form-container_fields-account">
                  <p>
                    {isSignup
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <span onClick={switchMode}>Sign Up</span>
                  </p>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signInImage} alt="sign-in" />
      </div>
    </div>
  );
};

export default Auth;
