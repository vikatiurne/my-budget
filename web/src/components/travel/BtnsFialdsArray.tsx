import { ITransport, IAccommodation } from "@/types/types";
import React from "react";

interface BtnsFialdsArrayProps {
  idx: number;
  fields: (ITransport | IAccommodation)[];
  append: () => void;
  remove: () => void;
}

const BtnsFialdsArray: React.FC<BtnsFialdsArrayProps> = ({
  idx,
  fields,
  append,
  remove,
}) => {
  return (
    <>
      {idx + 1 === fields.length ? (
        <button
          className="p-2 w-6 shadow-md rounded-b-full bg-[#daa520] text-white  text-sm cursor-pointer"
          type="button"
          onClick={append}
        >
          +
        </button>
      ) : (
        <button
          type="button"
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
