import { useAppTranslation } from "@/hooks/useAppTranslation";
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

   const { ti } = useAppTranslation();

  return (
    <select
      {...field}
      onChange={(e) => {
        field.onChange(e);
        handleChange(e);
      }}
      value={field.value || ""}
      className="shadow w-full md:w-36 text-sm appearance-none rounded py-2.5 px-3 leading-tight focus:outline-none focus:shadow-outline "
    >
      <option value="">-- {ti("select")} --</option>
      {options.map((item, i) => (
        <option key={item.value + i} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
