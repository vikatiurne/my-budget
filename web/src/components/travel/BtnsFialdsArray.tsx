import React from "react";

interface BtnsFialdsArrayProps {
  idx: number;
  append: () => void;
  remove: () => void;
}

const BtnsFialdsArray: React.FC<BtnsFialdsArrayProps> = ({
  idx,
  append,
  remove,
}) => {
  return (
    <>
      {idx === 0 ? (
        <button
          className="p-2 w-6 shadow-md rounded-b-full bg-[#daa520] text-white  text-sm cursor-pointer"
          type="button"
          onClick={append}
          title="add"
        >
          +
        </button>
      ) : (
        <button
          type="button"
          title="delete"
          onClick={remove}
          className="p-2 w-6 shadow-md rounded-t-full bg-[#816f42] text-white font-bold text-sm cursor-pointer"
        >
          -
        </button>
      )}
    </>
  );
};

export default BtnsFialdsArray;
