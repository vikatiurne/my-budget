import React from "react";

interface IconProps {
  children: React.ReactNode;
  name: string;
  onClick: () => void;
}

const Icon: React.FC<IconProps> = ({ children, name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
    >
      {children}

      <p className="text-sm lowercase">{name}</p>
    </button>
  );
};

export default Icon;
