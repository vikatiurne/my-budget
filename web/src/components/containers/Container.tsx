import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  style?: string;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <div className={`p-4 md:max-w-4/5 mx-auto ${!!style ? style : ""}`}>
      {children}
    </div>
  );
};

export default Container;
