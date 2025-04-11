import React from "react";
import InputPrice from "./InputPrice";

interface InputTravelProps {
  labelText: string;
  fieldName: string;
}

const InputTravel: React.FC<InputTravelProps> = ({ labelText, fieldName }) => {
  return (
    <div className="flex gap-4 items-center mb-4">
      <label className="text-sm font-bold w-36" htmlFor={fieldName}>
        {labelText}
      </label>
      <InputPrice fieldName={fieldName} />
    </div>
  );
};

export default InputTravel;
