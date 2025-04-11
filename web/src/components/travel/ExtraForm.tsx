import React from "react";
import InputPrice from "../UI/InputPrice";

const ExtraForm = () => {
  return (
    <div className="mb-6">
      <h4 className="mb-4 text-xl text-[#daa520]">Unaccounted expenses</h4>
      <InputPrice fieldName="extra" />
    </div>
  );
};

export default ExtraForm;
