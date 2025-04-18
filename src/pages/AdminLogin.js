import React from "react";
import { Link } from 'react-router-dom';

const App = () => {
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
          min-height: 480px;
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
          background: linear-gradient(to right,rgb(116, 202, 116),#32cd32);
          color: white;
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
        }

        .social-icons {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .social-icons a {
          text-decoration: none;
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
          font-weight: bold;
          font-size: 16px;
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
          background-color: #32cd32;
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

        .forgot {
          margin-top: 5px;
          font-size: 12px;
          color: #666;
        }
`}</style>

      <div className="container">
        <div className="sign-in">
          <h2>Sign in as Admin</h2>
          <div className="social-icons">
            <a href="#">f</a>
            <a href="#">G+</a>
            <a href="#">in</a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a className="forgot" href="#">Forgot your password?</a>
          <Link to="/AdminDashboard">    <button className="btn">SIGN IN</button></Link>
      
        </div>
        <div className="sign-up">
          <h2>Hello</h2>
          <p>Enter your personal details and start journey with us</p>
          <Link to="/signup">
          <button className="btn btn-outline">SIGN UP</button>
      </Link>
         
        </div>
      </div>
    </>
  );
};

export default App;
