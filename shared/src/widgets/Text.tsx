import classNames from "classnames";
import React from "react";

interface TextProps {
  value: string;
}

const Text: React.FC<TextProps> = ({ value }) => {
  const containerClass = classNames("app-container", "active", "visible");
  return <div className={containerClass}>{value}</div>;
};

export default Text;
