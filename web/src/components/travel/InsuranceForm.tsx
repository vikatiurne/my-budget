import InputTravel from "../UI/InputTravel";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface InsuranceFormProps {
  showForm: boolean;
  formActive: () => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({
  showForm,
  formActive,
}) => {
  return (
    showForm && (
      <div className="mb-6 ">
        <TitleTravelBlock title="Insurances" formActive={formActive} />

        <InputTravel
          fieldName="greencard"
          labelText="Green Card"
          split="split"
        />
        <InputTravel fieldName="healthInsurance" labelText="Health Insurance" />
      </div>
    )
  );
};

export default InsuranceForm;
