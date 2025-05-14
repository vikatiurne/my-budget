import { useAppTranslation } from "@/hooks/useAppTranslation";
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

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();

    if (setSelected) setSelected();

    formActive();
    setValue(blockName, []);
    resetField(blockName);
  };

  const { tb } = useAppTranslation();

  return (
    <button className="w-full relative mb-2 flex justify-between gap-4 items-center border-b border-gray-200 cursor-pointer">
      <h4 className="text-lg md:text-xl text-[#daa520]">{title}</h4>
      <CiCircleRemove
        className="w-6 h-6 cursor-pointer"
        onClick={(e) => handleClick(e)}
        title={tb("removeTitle")}
      />
    </button>
  );
};

export default TitleTravelBlock;
