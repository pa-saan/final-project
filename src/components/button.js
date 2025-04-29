import React from "react";

const Button = () => {
  return (
    <button
      style={{
        backgroundColor:"#32cd32" ,
        color: "black",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "bold",
        border: "2px solid #32cd32",
        borderRadius: "30px",
        cursor: "pointer",
        alignItems: "center",
        gap: "8px",
        transition: "0.3s",
        margin:"30px"
        
      }}
     
    >
      Get Started →
    </button>
  );
};

export default Button;
