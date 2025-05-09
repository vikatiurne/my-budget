import { ITransport, ITravelCosts, TotalValueField } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";
import { FcCalculator } from "react-icons/fc";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface RoadFormProps {
  fuelPrice: () => void;
  showForm: boolean;
  formActive: () => void;
}

const RoadForm: React.FC<RoadFormProps> = ({
  fuelPrice,
  showForm,
  formActive,
}) => {
  const { tr, ti } = useAppTranslation();

  const options = [
    { value: "car", label: tr("car") },
    { value: "train", label: tr("train") },
    { value: "fly", label: tr("fly") },
    { value: "bus", label: tr("bus") },
    { value: "chip", label: tr("chip") },
    { value: "rent", label: tr("rentCar") },
  ];

  const { control, register, setValue } = useFormContext<{
    transport: ITransport[];
  }>();
  const trMethods = useFormContext<ITravelCosts>();

  const [selestedTransportValues, setSelestedTransportValues] = useState<
    TotalValueField[]
  >([]);
  const [selestedNames, setSelestedNames] = useState<string[]>([]);
  const [total, setTotal] = useState<string>("");
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [isToSides, setIsToSides] = useState<boolean>(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transport",
  });

  useEffect(() => {
    if (showForm && !fields.length) {
      append({ typeofTransport: "", price: null });
    }
  }, [append, showForm, fields.length]);

  useEffect(() => {
    const sumforfield = selestedTransportValues
      .filter((item) => item.totalField !== null && item.totalField !== "")
      .reduce(
        (acc: number, item: TotalValueField) => acc + parseInt(item.totalField),

        0
      );
    const sumtosideds = isToSides ? sumforfield * 2 : sumforfield;
    setTotal(sumtosideds.toString());
  }, [selestedTransportValues, isToSides]);

  const handleRemote = (idx: number) => {
    remove(idx);
    const fileted = selestedTransportValues.filter((_, i) => i !== idx);
    setSelestedTransportValues(fileted);
  };

  const handleTransportChange = (
    idx: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedValues = [...selestedTransportValues];
    updatedValues[idx] = { field: e.target.name, totalField: "" };
    setSelestedTransportValues(updatedValues);

    const updatedName = [...selestedNames];
    updatedName[idx] = e.target.value;
    setSelestedNames(updatedName);
  };

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const updatedValues = [...selestedTransportValues];
    if (updatedValues[idx]) {
      updatedValues[idx].totalField = e.target.value;
      setSelestedTransportValues(updatedValues);
    }
  };

  const handleBlurPrice = (idx: number) => {
    setValue(`transport.${idx}.price`, selestedTransportValues[idx].totalField);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsToSides(e.target.checked);
  };

  const getContentForSelectedTransport = (idx: number) => {
    const currentTransport = selestedTransportValues[idx];

    if (!currentTransport) return null;

    const selectedTransportValue = selestedNames[idx];

    if (!selectedTransportValue) return null;

    const components = [];

    if (selectedTransportValue === "car")
      components.push(
        <button key="fuelCalculator" onClick={() => fuelPrice()}>
          <FcCalculator className="w-8 h-8 cursor-pointer" />
        </button>
      );

    components.unshift(
      <InputPrice
        key={`${tr("transport")}-${idx}-price`}
        fieldName={`transport.${idx}.price`}
        placeholder={ti("price")}
        register={register}
        isRequired={true}
        value={currentTransport.totalField ? currentTransport.totalField : ""}
        onChange={(e) => handlePriceChange(e, idx)}
        onBlur={() => handleBlurPrice(idx)}
      />
    );
    return components;
  };

  return (
    <div>
      {showForm ? (
        <TitleTravelBlock
          title={`${tr("modesTransportation")} - ${total} ₴`}
          blockName="transport"
          formActive={formActive}
          setSelected={() => setSelestedTransportValues([])}
          setShowDetails={handleShowDetails}
        />
      ) : (
        total !== "0" && (
          <TitleTravelBlock
            title={`${tr("modesTransportation")} - ${total} ₴`}
            blockName="transport"
            formActive={formActive}
            setSelected={() => setSelestedTransportValues([])}
            setShowDetails={handleShowDetails}
          />
        )
      )}

      {showForm && showDetail && (
        <div className="mb-4 shadow pt-4 pb-1 px-2 bg-[#f5f3f2]">
          {fields.map((item, idx) => (
            <div key={item.id} className="flex gap-4 mb-4 items-center">
              <div>
                <label
                  htmlFor={`name-${idx}`}
                  className="text-sm font-bold text-gray-600"
                >
                  {tr("transport")} №{idx + 1}
                </label>

                <div className="flex flex-wrap gap-2 md:gap-4 items-center">
                  <Controller
                    name={`transport.${idx}.typeofTransport`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomSelect
                        field={field}
                        options={options}
                        handleChange={(e) => handleTransportChange(idx, e)}
                      />
                    )}
                  />
                  <div className="flex">
                    {getContentForSelectedTransport(idx)}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center ">
                <BtnsFialdsArray
                  idx={idx}
                  append={() => append({ typeofTransport: "", price: null })}
                  remove={() => handleRemote(idx)}
                />
              </div>
            </div>
          ))}
          <input
            type="checkbox"
            {...trMethods.register("twosides")}
            checked={isToSides}
            onChange={(e) => handleCheckbox(e)}
          />
          <label htmlFor="twosides" className="text-md ml-2 text-gray-600">
            {tr("includeReturnTrip")}
          </label>
        </div>
      )}
    </div>
  );
};

export default RoadForm;
