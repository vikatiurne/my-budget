import { useEffect, useState } from "react";
import InputTravel from "../UI/InputTravel";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { TotalValueField } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useFormContext } from "react-hook-form";

interface InsuranceFormProps {
  showForm: boolean;
  formActive: () => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({
  showForm,
  formActive,
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [totalValField, setTotalValField] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("");

  useEffect(() => {
    const sumforfield = totalValField.reduce(
      (acc: number, item: TotalValueField) => acc + parseInt(item.totalField),
      0
    );
    setTotal(sumforfield.toString());
  }, [totalValField]);

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const handleBlurField = (newTotalVal: TotalValueField) => {
    const filtered = totalValField.filter(
      (item) => item.field !== newTotalVal.field
    );
    setTotalValField([...filtered, newTotalVal]);
  };

  const { setValue, watch } = useFormContext();

  const { tinc } = useAppTranslation();

  const resetInsuranceValues = () => {
    setTotalValField([]);
    setValue("greencard", "");
    setValue("healthInsurance", "");
  };

  return (
    <div>
      {showForm ? (
        <TitleTravelBlock
          title={`${tinc("insurances")} - ${total} ₴`}
          formActive={formActive}
          setShowDetails={handleShowDetails}
          setSelected={resetInsuranceValues}
        />
      ) : (
        total !== "0" && (
          <TitleTravelBlock
            title={`${tinc("insurances")} - ${total} ₴`}
            formActive={formActive}
            setShowDetails={handleShowDetails}
            setSelected={resetInsuranceValues}
          />
        )
      )}
      {showForm && showDetail && (
        <div className="mb-4 shadow pt-4 pb-1 px-2 bg-[#f5f3f2]">
          <InputTravel
            fieldName="greencard"
            labelText={tinc("greenCard")}
            split="split"
            onTotalValField={handleBlurField}
            value={watch("greencard")}
          />
          <InputTravel
            fieldName="healthInsurance"
            labelText={tinc("health")}
            onTotalValField={handleBlurField}
            value={watch("healthInsurance")}
          />
        </div>
      )}
    </div>
  );
};

export default InsuranceForm;
