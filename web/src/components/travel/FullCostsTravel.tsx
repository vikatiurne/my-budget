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

  const [isSelectFields, setIsSelectFields] = useState<boolean>(false);
  const [activePopap, setActivePopap] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    const arr = [
      showAccomondationForm,
      showActivitiesForm,
      showExtraForm,
      showFoodForm,
      showInsuranceForm,
      showRoadForm,
      showRoadTaxForm,
      showSightseeingForm,
    ];
    const isSelect = arr.filter((item) => item);
    setIsSelectFields(!!isSelect.length);

    setTotalPrice(null);
  }, [
    showAccomondationForm,
    showActivitiesForm,
    showExtraForm,
    showFoodForm,
    showInsuranceForm,
    showRoadForm,
    showRoadTaxForm,
    showSightseeingForm,
  ]);

  const { isAuth } = useAuthContext();

  const methods = useForm<ITravelCosts>();

  const { handleSubmit, reset } = methods;

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
    reset();
  };

  const onBudgetCalculate = (data: ITravelCosts) => {
    const obj = getDataTravelCost(data);
    setTotalPrice(obj.total);
  };

  const showFuelPriceForm = () => setIsFuelPriceForm(true);

  const { tt, tm, ti, tb } = useAppTranslation();

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
          onClick={() => setShowAccomondationForm(true)}
          name={tt("hotels")}
        >
          <FaHotel className={styles.icon} />
        </Icon>
        <Icon onClick={() => setShowRoadForm(true)} name={tt("transport")}>
          <MdDirectionsTransit className={styles.icon} />
        </Icon>
        <Icon onClick={() => setShowInsuranceForm(true)} name={tt("insurance")}>
          <AiOutlineInsurance className={styles.icon} />
        </Icon>
        <Icon onClick={() => setShowRoadTaxForm(true)} name={tt("roadTax")}>
          <FaRoad className={styles.icon} />
        </Icon>
        <Icon onClick={() => setShowSightseeingForm(true)} name={tt("landmark")}>
          <FaLandmarkDome className={styles.icon} />
        </Icon>
        <Icon onClick={() => setShowFoodForm(true)} name={tt("food")}>
          <IoFastFoodOutline className={styles.icon} />
        </Icon>
        <Icon onClick={() => setShowActivitiesForm(true)} name={tt("activities")}>
          <MdOutlineSportsHandball className={styles.icon} />
        </Icon>
        <Icon onClick={() => setShowExtraForm(true)} name={tt("other")}>
          <LuListPlus className={styles.icon} />
        </Icon>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AccommodationForm
            showForm={showAccomondationForm}
            formActive={() => setShowAccomondationForm(false)}
          />
          <RoadForm
            fuelPrice={showFuelPriceForm}
            showForm={showRoadForm}
            formActive={() => setShowRoadForm(false)}
          />
          <InsuranceForm
            showForm={showInsuranceForm}
            formActive={() => setShowInsuranceForm(false)}
          />
          <RoadTaxForm
            showForm={showRoadTaxForm}
            formActive={() => setShowRoadTaxForm(false)}
          />
          <SightseeingForm
            showForm={showSightseeingForm}
            formActive={() => setShowSightseeingForm(false)}
          />
          <FoodForm
            showForm={showFoodForm}
            formActive={() => setShowFoodForm(false)}
          />
          <SeasonalActivities
            showForm={showActivitiesForm}
            formActive={() => setShowActivitiesForm(false)}
          />
          <ExtraForm
            showForm={showExtraForm}
            formActive={() => setShowExtraForm(false)}
          />

          {!!totalPrice && (
            <p className="mb-4 text-end text-xl font-black">
              {tt("totalPrice")} <span>{totalPrice} ₴</span>
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between ">
            {!!isAuth && isSelectFields && (
              <button
                onClick={() => setActivePopap(true)}
                type="button"
                className=" block py-2 px-4 shadow-md rounded bg-green-500 text-white uppercase text-sm cursor-pointer"
              >
                {tb("saveBudget")}
              </button>
            )}
            {isSelectFields && (
              <button
                type="button"
                onClick={methods.handleSubmit(onBudgetCalculate)}
                className=" block  py-2 px-4 shadow-md rounded bg-blue-400 text-white uppercase text-sm cursor-pointer"
              >
                {tt("calculate")}
              </button>
            )}
          </div>
          {activePopap && (
            <Popap active={activePopap} setActive={() => setActivePopap(false)}>
              <div>
                <h6 className="mx-auto mb-4 w-72 text-xl text-center text-yellow-50">
                  {tt("writeBudgetName")}
                </h6>
                <input
                  className="mx-auto mb-4 p-2 block w-56 border-gray-300 outline-none rounded shadow-sm bg-amber-50 dark:shadow-amber-50"
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
