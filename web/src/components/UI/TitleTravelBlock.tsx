import React from "react";
import { useFormContext } from "react-hook-form";
import { CiCircleRemove } from "react-icons/ci";

interface TitleTravelBlockProps {
  title: string;
  blockName?: string;
  formActive: () => void;
  setSelected?: () => void;
}

const TitleTravelBlock: React.FC<TitleTravelBlockProps> = ({
  blockName = "",
  title,
  formActive,
  setSelected,
}) => {
  const { resetField, setValue } = useFormContext();

  const handleClick = () => {
    if (setSelected) setSelected();

    formActive();
    setValue(blockName, []);
    resetField(blockName);
  };

  return (
    <div className="mb-4 flex gap-4 items-center">
      <h4 className="text-xl text-[#daa520]">{title}</h4>
      <CiCircleRemove
        className="w-6 h-6 cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default TitleTravelBlock;
