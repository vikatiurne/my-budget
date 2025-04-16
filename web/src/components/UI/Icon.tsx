import React from "react";

interface IconProps {
  children: React.ReactNode;
  name: string;
  onClick: () => void;
}

const Icon: React.FC<IconProps> = ({ children, name, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center">
      {children}

      <p className="text-sm">{name}</p>
    </button>
  );
};

export default Icon;
