import React, { useState } from "react";

const CustomSelect = () => {
  const [selected, setSelected] = useState("");
  const options = [
    { value: "car", label: "Car" },
    { value: "train", label: "Train" },
    { value: "fly", label: "Fly" },
    { value: "bus", label: "Bus" },
    { value: "chip", label: "Chip" },
  ];

  return (
    <div className="relative inline-block w-36">
      <button className="shadow w-full appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        {selected || "-- Select --"}
      </button>
      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => setSelected(option.label)}
            className="py-2 px-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
