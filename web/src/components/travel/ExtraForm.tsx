import React from "react";
import InputPrice from "../UI/InputPrice";
import { useFormContext } from "react-hook-form";
import { ITravelCosts } from "@/types/types";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface ExtraFormProps {
  showForm: boolean;
  formActive: () => void;
}

const ExtraForm: React.FC<ExtraFormProps> = ({ showForm, formActive }) => {
  const { register } = useFormContext<ITravelCosts>();

  return (
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          title="Unaccounted expenses"
          formActive={formActive}
        />
        <InputPrice
          fieldName="extra"
          placeholder="price..."
          register={register}
        />
      </div>
    )
  );
};

export default ExtraForm;
