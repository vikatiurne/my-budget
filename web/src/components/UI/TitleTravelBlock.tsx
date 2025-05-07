import { useAppTranslation } from "@/hooks/useAppTranslation";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineArrowDropDown } from "react-icons/md";

interface TitleTravelBlockProps {
  title: string;
  blockName?: string;
  formActive: () => void;
  setSelected?: () => void;
  setShowDetails: () => void;
}

const TitleTravelBlock: React.FC<TitleTravelBlockProps> = ({
  blockName = "",
  title,
  formActive,
  setSelected,
  setShowDetails,
}) => {
  const [rotateArrow, setRotateArrow] = useState<boolean>(true);
  const { resetField, setValue } = useFormContext();

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();

    if (setSelected) setSelected();

    formActive();
    setValue(blockName, []);
    resetField(blockName);
  };

  const handleClickTitleBlock = () => {
    setRotateArrow((prev) => !prev);
    setShowDetails();
  };
   const {tb } = useAppTranslation();

  return (
    <button
      className="w-full relative mb-6 flex justify-between gap-4 items-center border-b border-gray-200 cursor-pointer"
      onClick={handleClickTitleBlock}
      title="show detail"
    >
      <h4 className="text-xl text-[#daa520]">{title}</h4>
      <CiCircleRemove
        className="w-6 h-6 cursor-pointer"
        onClick={(e) => handleClick(e)}
        title={tb("removeTitle")}
      />
      <MdOutlineArrowDropDown
        className={`absolute w-9 h-9 left-1/2  fill-gray-200  ${
          rotateArrow
            ? "top-[7px] transform  rotate-180"
            : "top-[14px] transform  rotate-0"
        }`}
      />
    </button>
  );
};

export default TitleTravelBlock;
