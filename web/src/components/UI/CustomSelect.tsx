import React from "react";

interface IOption {
  value: string;
  label: string;
}

interface IField {
  name: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
}

interface CustomSelectProps {
  options: IOption[];
  field: IField;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  field,
  handleChange,
}) => {
  return (
    <select
      {...field}
      onChange={(e) => {
        field.onChange(e);
        handleChange(e);
      }}
      className="shadow w-36 appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">-- Select --</option>
      {options.map((item, i) => (
        <option key={item.value + i} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
