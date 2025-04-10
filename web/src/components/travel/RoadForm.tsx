import { ITransport } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";

const RoadForm = () => {
  const { register, control, watch } = useForm<{ transport: ITransport[] }>();
  const [selestedTransportValue, setSelestedTransportValue] = useState<
    ITransport[]
  >([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transport",
  });

  const transportValues = watch();
  console.log(fields);
  useEffect(() => {
    if (transportValues && transportValues.transport) {
      const selectedTransport = transportValues.transport.map((item) => {
        return {
          typeofTransport: item.typeofTransport,
          price: item.price,
        };
      });
      // setTransportValue(selectedTransport);

      // selectedTransport.map(item => (

      // ))
    }
  }, [transportValues]);

  useEffect(() => {
    if (fields.length === 0) {
      append({ typeofTransport: "", price: null });
    }
  }, [append, fields.length]);

  return (
    <div>
      <h4 className="mb-4 text-xl text-[#daa520]">
        Your modes of transportation
      </h4>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
          <label htmlFor="select" className="text-sm font-bold">Transport №{idx+1}</label>
          <Controller
            name={`transport.${idx}.typeofTransport`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                className="shadow w-36 appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">-- Select --</option>
                <option value="car">Car</option>
                <option value="train">Train</option>
                <option value="fly">Fly</option>
                <option value="bus">Bus</option>
                <option value="chip">Chip</option>
              </select>
            )}
          />
          {/* {transportValue !== "car" && transportValue !== "" ? (
            <>
              <input
                className="p-1.5 block w-20 border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
                type="number"
                placeholder="sum..."
                {...register(`transport.${idx}.price`, {
                  required: "field is required",
                })}
              />
              <p>₴</p>
            </>
          ) : null} */}
          <div className="flex gap-2 items-center ">
            <BtnsFialdsArray
              idx={idx}
              fields={fields}
              append={() => append({ typeofTransport: "", price: null })}
              remove={() => remove(idx)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadForm;
