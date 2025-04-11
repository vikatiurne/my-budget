import { ITravelCosts } from "@/types/types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import AccommodationForm from "./AccommodationForm";
import RoadForm from "./RoadForm";
import { useAuthContext } from "@/hooks/useAuthContext";
import InsuranseForm from "./InsuranseForm";
import RoadTaxForm from "./RoadTaxForm";
import SightseeingForm from "./SightseeingForm";
import FoodForm from "./FoodForm";
import SeasonalActivities from "./SeasonalActivities";
import ExtraForm from "./ExtraForm";

const FullCostsTravel = () => {
  const { isAuth } = useAuthContext();
  const methods = useForm<ITravelCosts>({
    defaultValues: { extra: null },
  });
  const {  handleSubmit } = methods;

  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AccommodationForm />
        <RoadForm />
        <InsuranseForm />
        <RoadTaxForm />
        <SightseeingForm />
        <FoodForm />
        <SeasonalActivities />
        <ExtraForm />
        {!!isAuth && <button type="submit">Save Budget</button>}
      </form>
    </FormProvider>
  );
};

export default FullCostsTravel;
