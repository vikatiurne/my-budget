import InputTravel from "../UI/InputTravel";

const InsuranseForm = () => {
  return (
    <div className="mb-6 ">
      <h4 className="mb-4 text-xl text-[#daa520]">Insuranses</h4>
      <InputTravel fieldName="greencard" labelText="Green Card" />
      <InputTravel fieldName="healthInsuranse" labelText="Health Insuranse" />
    </div>
  );
};

export default InsuranseForm;
