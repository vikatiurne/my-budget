import { ITransport } from "@/types/types";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const RoadForm = () => {
  const { control } = useForm<ITransport>();

  return (
    <div>
      <label htmlFor="select">Choose type of transport</label>
      <Controller
        name="typeofTransport"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <select {...field}>
            <option value=""></option>
            <option value="car">Car</option>
            <option value="train">Train</option>
            <option value="fly">Fly</option>
            <option value="bus">Bus</option>
            <option value="chip">Chip</option>
          </select>
        )}
      />
    </div>
  );
};

export default RoadForm;
