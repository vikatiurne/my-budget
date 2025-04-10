import { ITravelCosts } from "@/types/types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import AccommodationForm from "./AccommodationForm";
import RoadForm from "./RoadForm";
import { useAuthContext } from "@/hooks/useAuthContext";

const FullCostsTravel = () => {
  const { isAuth } = useAuthContext();
  const methods = useForm<ITravelCosts>({
    defaultValues: { extra: null },
  });
  const { register, handleSubmit, reset } = methods;

  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AccommodationForm />
        <RoadForm />
        <label htmlFor="other">Other expenses</label>
        <input
          className="p-2 block  border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
          type="number"
          placeholder="type a sum..."
          {...register("extra")}
        />
        {!!isAuth && <button type="submit">Save Budget</button>}
      </form>
    </FormProvider>
  );
};

export default FullCostsTravel;
