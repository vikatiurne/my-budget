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
      <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-20">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[30rem] px-8 py-4 bg-teal-800 rounded transform transition-all duration-300 ${
            active ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popap;
