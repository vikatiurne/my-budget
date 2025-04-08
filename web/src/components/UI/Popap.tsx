import React from "react";

interface PopapProps {
  active: boolean;
  setActive: () => void;
  children: React.ReactNode;
}

const Popap: React.FC<PopapProps> = ({ active, setActive, children }) => {
  return (
    <div
      className="flex justify-center items-center fixed z-50 top-0 left-0 h-screen w-screen"
      onClick={() => setActive()}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-70" />
      <div
        className={`max-w-[30rem] p-4 bg-[#daa520] rounded transform transition-all duration-300 ${
          active ? "scale-100 opacity-100" : "scale-50"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Popap;
