import { useEffect, useState } from "react";
import InputTravel from "../UI/InputTravel";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { TotalValueField } from "@/types/types";

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

  return (
    showForm && (
      <div className="mb-6 ">
        <TitleTravelBlock
          title={`Insurances - ${total} ₴`}
          formActive={formActive}
          setShowDetails={handleShowDetails}
          setSelected={() => setTotalValField([])}
        />
        {showDetail && (
          <>
            <InputTravel
              fieldName="greencard"
              labelText="Green Card"
              split="split"
              onTotalValField={handleBlurField}
            />
            <InputTravel
              fieldName="healthInsurance"
              labelText="Health Insurance"
              onTotalValField={handleBlurField}
            />
          </>
        )}
      </div>
    )
  );
};

export default InsuranceForm;
