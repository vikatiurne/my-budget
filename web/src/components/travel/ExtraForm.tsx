import React, { useState } from "react";
import InputPrice from "../UI/InputPrice";
import { useFormContext } from "react-hook-form";
import { ITravelCosts } from "@/types/types";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { useAppTranslation } from "@/hooks/useAppTranslation";

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

  const { ti, tt } = useAppTranslation();

  console.log(localPrice);
  return (
    <div className="mb-6">
      {showForm ? (
        <TitleTravelBlock
          title={`${tt("unaccountedExpenses")} - ${
            !localPrice ? 0 : localPrice
          } ₴`}
          formActive={formActive}
          setShowDetails={handleShowDetails}
          setSelected={() => setValue("extra", "")}
        />
      ) : (
        localPrice !== "" && (
          <TitleTravelBlock
            title={`${tt("unaccountedExpenses")} - ${
              !localPrice ? 0 : localPrice
            } ₴`}
            formActive={formActive}
            setShowDetails={handleShowDetails}
            setSelected={() => setValue("extra", "")}
          />
        )
      )}
      {showForm && showDetail && (
        <div className="mb-4 shadow pt-4 pb-1 px-2 bg-[#f5f3f2]">
          <InputPrice
            fieldName="extra"
            placeholder={ti("price")}
            register={register}
            onBlur={handleBlurPrice}
            value={localPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocalPrice(e.target.value)
            }
          />
        </div>
      )}
    </div>
  );
};

export default ExtraForm;
