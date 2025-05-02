import React, { useState } from "react";
import InputPrice from "../UI/InputPrice";
import { useFormContext } from "react-hook-form";
import { ITravelCosts } from "@/types/types";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface ExtraFormProps {
  showForm: boolean;
  formActive: () => void;
}

const ExtraForm: React.FC<ExtraFormProps> = ({ showForm, formActive }) => {
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [localPrice, setLocalPrice] = useState<string | undefined>("");

  const { register, setValue } = useFormContext<ITravelCosts>();

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const handleBlurPrice = () => setValue("extra", localPrice);

  return (
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          title={`Unaccounted expenses - ${!localPrice ? 0 : localPrice} ₴`}
          formActive={formActive}
          setShowDetails={handleShowDetails}
          setSelected={() => setValue("extra", "")}
        />
        {showDetail && (
          <InputPrice
            fieldName="extra"
            placeholder="price..."
            register={register}
            onBlur={handleBlurPrice}
            value={localPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocalPrice(e.target.value)
            }
          />
        )}
      </div>
    )
  );
};

export default ExtraForm;
