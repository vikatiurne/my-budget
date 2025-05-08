import { useEffect, useState } from "react";
import InputTravel from "../UI/InputTravel";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { TotalValueField } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";

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

  const { tinc } = useAppTranslation();

  return (
    showForm && (
      <div >
        <TitleTravelBlock
          title={`${tinc("insurances")} - ${total} ₴`}
          formActive={formActive}
          setShowDetails={handleShowDetails}
          setSelected={() => setTotalValField([])}
        />
        {showDetail && (
          <div className="mb-4 shadow pt-4 pb-1 px-2 bg-[#f5f3f2]">
            <InputTravel
              fieldName="greencard"
              labelText={tinc("greenCard")}
              split="split"
              onTotalValField={handleBlurField}
            />
            <InputTravel
              fieldName="healthInsurance"
              labelText={tinc("health")}
              onTotalValField={handleBlurField}
            />
          </div>
        )}
      </div>
    )
  );
};

export default InsuranceForm;
