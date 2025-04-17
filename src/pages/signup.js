import React, { useState } from "react";

const App = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // For now, we just log the data (you can replace this with API call)
    console.log("Registering:", registerData);
    alert("Registered successfully!");
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          background: #f6f5f7;
        }

        .container {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25),
                      0 10px 10px rgba(0,0,0,0.22);
          display: flex;
          width: 768px;
          max-width: 100%;
          min-height: 500px;
          overflow: hidden;
          margin: 50px auto;
        }

        .sign-in, .sign-up {
          flex: 1;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .sign-in {
          background: #fff;
        }

        .sign-up {
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          color: white;
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: none;
          background: #eee;
          border-radius: 5px;
        }

        .btn {
          border: none;
          border-radius: 20px;
          padding: 10px 30px;
          background-color: #ff4b2b;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          margin-top: 10px;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #fff;
          color: #fff;
        }

        .form-group {
          width: 100%;
          max-width: 300px;
        }
      `}</style>

      <div className="container">
        {/* Sign-in section */}
        <div className="sign-in">
          <h2>Sign in</h2>
          <div className="social-icons">
            <a href="#">f</a>
            <a href="#">G+</a>
            <a href="#">in</a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a className="forgot" href="#">Forgot your password?</a>
          <button className="btn">SIGN IN</button>
        </div>

        {/* Register section */}
        <div className="sign-up">
          <h2>Create Account</h2>
          <p>Enter your details below to sign up</p>
          <form className="form-group" onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-outline">REGISTER</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
