import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#646cff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      Go
    </button>
  );
};

export default Button;
