import { IBudget, ITravelCosts } from "@/types/types";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AccommodationForm from "./AccommodationForm";

import CarInfo from "./CarInfo";
import RoadForm from "./RoadForm";

import RoadTaxForm from "./RoadTaxForm";
import SightseeingForm from "./SightseeingForm";
import FoodForm from "./FoodForm";
import SeasonalActivities from "./SeasonalActivities";
import ExtraForm from "./ExtraForm";

import Icon from "../UI/Icon";
import { FaHotel, FaLandmarkDome } from "react-icons/fa6";
import { MdDirectionsTransit, MdOutlineSportsHandball } from "react-icons/md";
import { AiOutlineInsurance } from "react-icons/ai";
import { FaRoad } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuListPlus } from "react-icons/lu";
import InsuranceForm from "./InsuranceForm";

import Popap from "../UI/Popap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getDataTravelCost } from "@/utils/getDataTravelCost";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const styles = {
  icon: "p-1 w-10 h-10 border rounded",
};

const FullCostsTravel = () => {
  const [isFuelPriceForm, setIsFuelPriceForm] = useState<boolean>(false);
  const [showAccomondationForm, setShowAccomondationForm] =
    useState<boolean>(false);
  const [showFoodForm, setShowFoodForm] = useState<boolean>(false);
  const [showInsuranceForm, setShowInsuranceForm] = useState<boolean>(false);
  const [showRoadForm, setShowRoadForm] = useState<boolean>(false);
  const [showRoadTaxForm, setShowRoadTaxForm] = useState<boolean>(false);
  const [showActivitiesForm, setShowActivitiesForm] = useState<boolean>(false);
  const [showSightseeingForm, setShowSightseeingForm] =
    useState<boolean>(false);
  const [showExtraForm, setShowExtraForm] = useState<boolean>(false);

  const [activePopap, setActivePopap] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const [totalValue, setTotalValue] = useState<{ [key: string]: string }[]>([]);

  const { isAuth } = useAuthContext();

  const methods = useForm<ITravelCosts>({ mode: "onChange" });

  const { handleSubmit, reset, formState } = methods;
  const { isValid, isDirty } = formState;

  const queryClient = useQueryClient();

  const { userId } = useAuthContext();

  const budgetMutation = useMutation({
    mutationFn: (budgetdata: IBudget) => createBudget(budgetdata),
    onMutate: async (data: IBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      const prevBudget: IBudget[] = queryClient.getQueryData(["budgets"]) ?? [];
      const optimisticBudget: IBudget[] = [
        ...prevBudget,
        {
          name: data.name,
          budget: data.budget,
          user_id: userId,
          date: currentMonthYear(),
        },
      ];
      queryClient.setQueryData(["budgets"], optimisticBudget);
      return { prevBudget };
    },
    onError: (err, newBudget, context) => {
      queryClient.setQueryData(["budgets"], context?.prevBudget);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });

  const onSubmit = (data: ITravelCosts) => {
    if (!data.title) {
      return;
    } else {
      const obj = getDataTravelCost(data);
      const date = currentMonthYear();
      budgetMutation.mutate({
        name: obj.title,
        budget: obj.total,
        date: date,
        user_id: userId,
      });
    }
    setActivePopap(false);
    setIsFuelPriceForm(false);
    setShowAccomondationForm(false);
    setShowFoodForm(false);
    setShowInsuranceForm(false);
    setShowRoadForm(false);
    setShowRoadTaxForm(false);
    setShowActivitiesForm(false);
    setShowSightseeingForm(false);
    setShowExtraForm(false);
    setTotalPrice(null);
    reset();
  };

  const toggleForm = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  const showFuelPriceForm = () => setIsFuelPriceForm(true);

  const { tt, tm, ti, tb } = useAppTranslation();

  const handleUpdateTotal = (payload: { [key: string]: string }) => {
    const key = Object.keys(payload)[0];
    const value = Object.values(payload)[0];
    let foundKey = false;

    const newTotalValue = totalValue.map((item) => {
      if (Object.keys(item)[0] === key) {
        foundKey = true;
        return { [key]: value };
      } else {
        return item;
      }
    });

    if (!foundKey) newTotalValue.push(payload);
    setTotalValue(newTotalValue);
  };

  useEffect(() => {
    const updateTotal = totalValue.reduce(
      (acc: number, item: { [key: string]: string }) => {
        return acc + parseInt(Object.values(item)[0]);
      },
      0
    );
    setTotalPrice(updateTotal);
  }, [totalValue]);

  return (
    <div className="mb-8 mx-auto p-4 shadow rounded max-w-[49rem]">
      {isFuelPriceForm && (
        <CarInfo
          active={isFuelPriceForm}
          setActive={() => setIsFuelPriceForm(false)}
        />
      )}
      <h1 className="mb-8 text-3xl font-black text-center">
        {tt("CalculateTripBudget")}
      </h1>
      <div className="mb-6 flex flex-wrap gap-6 justify-center">
        <Icon
          onClick={() => toggleForm(setShowAccomondationForm)}
          name={tt("hotels")}
        >
          <FaHotel className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => toggleForm(setShowRoadForm)}
          name={tt("transport")}
        >
          <MdDirectionsTransit className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => toggleForm(setShowInsuranceForm)}
          name={tt("insurance")}
        >
          <AiOutlineInsurance className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => toggleForm(setShowRoadTaxForm)}
          name={tt("roadTax")}
        >
          <FaRoad className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => toggleForm(setShowSightseeingForm)}
          name={tt("landmark")}
        >
          <FaLandmarkDome className={styles.icon} />
        </Icon>
        <Icon onClick={() => toggleForm(setShowFoodForm)} name={tt("food")}>
          <IoFastFoodOutline className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => toggleForm(setShowActivitiesForm)}
          name={tt("activities")}
        >
          <MdOutlineSportsHandball className={styles.icon} />
        </Icon>
        <Icon onClick={() => toggleForm(setShowExtraForm)} name={tt("other")}>
          <LuListPlus className={styles.icon} />
        </Icon>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AccommodationForm
            showForm={showAccomondationForm}
            formActive={() => setShowAccomondationForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          <RoadForm
            fuelPrice={showFuelPriceForm}
            showForm={showRoadForm}
            formActive={() => setShowRoadForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          <InsuranceForm
            showForm={showInsuranceForm}
            formActive={() => setShowInsuranceForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          <RoadTaxForm
            showForm={showRoadTaxForm}
            formActive={() => setShowRoadTaxForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          <SightseeingForm
            showForm={showSightseeingForm}
            formActive={() => setShowSightseeingForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          <FoodForm
            showForm={showFoodForm}
            formActive={() => setShowFoodForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          <SeasonalActivities
            showForm={showActivitiesForm}
            formActive={() => setShowActivitiesForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          <ExtraForm
            showForm={showExtraForm}
            formActive={() => setShowExtraForm(false)}
            onUpdateTotal={handleUpdateTotal}
          />
          {!!totalPrice && (
            <p className="mb-4 text-end text-xl font-black">
              {tt("totalPrice")} <span>{totalPrice} ₴</span>
            </p>
          )}
          {!!isAuth && !!totalPrice && (
            <button
              onClick={() => setActivePopap(true)}
              disabled={!isValid || !isDirty}
              type="button"
              className=" block py-2 px-4 shadow-md rounded bg-teal-700 text-white md:uppercase text-sm cursor-pointer disabled:bg-gray-300"
            >
              {tb("saveBudget")}
            </button>
          )}

          {activePopap && (
            <Popap active={activePopap} setActive={() => setActivePopap(false)}>
              <div>
                <h6 className="mx-auto mb-4 w-72 text-xl text-center text-yellow-50">
                  {tt("writeBudgetName")}
                </h6>
                <input
                  className="mx-auto mb-4 p-2 block w-56 border-gray-300 outline-none rounded shadow-sm bg-amber-50"
                  type="text"
                  autoComplete="true"
                  placeholder={ti("budgetName")}
                  {...methods.register("title", {
                    required: tm("required"),
                  })}
                />
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setActivePopap(false)}
                    className="mb-2 block py-2 px-2 shadow-md rounded bg-gray-500 text-white uppercase text-sm cursor-pointer"
                  >
                    {tb("cancel")}
                  </button>
                  <button
                    type="submit"
                    className="mb-2 block py-2 px-4 shadow-md rounded bg-blue-500 text-white uppercase text-sm cursor-pointer"
                  >
                    {tb("save")}
                  </button>
                </div>
              </div>
            </Popap>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default FullCostsTravel;
