"use client";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import { IBudget } from "@/types/types";
import { createBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Loader from "../UI/Loader";
import { useRouter } from "next/navigation";

const AddBudgetForm: React.FC = () => {
  const [isMonthlybudget, setIsMonthlybudget] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<IBudget>();

  const { userId } = useAuthContext();

  const queryClient = useQueryClient();

  const router = useRouter();

  const queryBudget = useBudgetQuery();

  const { isFetching } = useBudgetQuery(showForm === "month");

  const budgetMutation = useMutation({
    mutationFn: (budgetdata: IBudget) => createBudget(budgetdata),
    onMutate: async (data: IBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budget"] });
      const prevBudget: IBudget[] = queryClient.getQueryData(["budget"]) ?? [];
      const optimisticBudget: IBudget[] = [
        ...prevBudget,
        {
          name: data.name,
          budget: data.budget,
          user_id: userId,
          date: currentMonthYear(),
        },
      ];
      queryClient.setQueryData(["budget"], optimisticBudget);
      return { prevBudget };
    },
    onError: (err, newBudget, context) => {
      queryClient.setQueryData(["budget"], context?.prevBudget);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const date = currentMonthYear();
    budgetMutation.mutate({
      name:
        data.name && data.name !== ""
          ? data.name
          : `monthly budget:${date.mounth}_${date.year}`,
      budget: data.budget,
      date: date,
      user_id: userId,
    });
    reset();
    setShowForm(null);
    router.push("/budgetlist");
  };

  const { tbg, tm, ti, tb } = useAppTranslation();

  const handleMonthingBudget = () => {
    const { data } = queryBudget;
    if (!data) {
      setIsMonthlybudget(true);
      setShowForm((prev) => (prev === "month" ? null : "month"));
    } else {
      setMessage((prev) => !prev);
      setShowForm(null);
    }
  };
  const handleTripBudget = () => {
    setIsMonthlybudget(false);
    setMessage(false);
    setShowForm((prev) => (prev === "trip" ? null : "trip"));
  };

  return (
    <div className="mb-8 mx-auto p-4 shadow rounded max-w-[49rem]">
      <h4 className="mb-8 text-3xl font-black text-center">
        {tbg("addBudget")}
      </h4>
      <div className="flex gap-6 justify-center items-center mb-8">
        <button
          onClick={handleMonthingBudget}
          className="py-2.5 px-4 mr-6 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        >
          {tbg("forMonth")}
        </button>

        <button
          onClick={handleTripBudget}
          className="py-2.5 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        >
          {tbg("forTrip")}
        </button>
      </div>
      {message && (
        <p>
          {tbg("messageBudget")}{" "}
          <Link href="/budget" className="text-teal-600">
            {tbg("goBudget")}
          </Link>
        </p>
      )}

      {(showForm === "month" || showForm === "trip") &&
        (isFetching ? (
          <>
            <p className="text-center mb-6">{tbg("checkMonthlyBudget")}</p>
            <Loader loading={isFetching} />
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-8 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <div className="flex gap-6 items-end">
              {!isMonthlybudget && (
                <label className="text-sm capitalize font-bold">
                  {ti("budgetName")}
                  <input
                    className="flex-1 w-full block p-2 border-gray-300 outline-none rounded shadow-sm"
                    {...register("name", {
                      required: !isMonthlybudget ? tm("required") : false,
                    })}
                    type="text"
                    placeholder={ti("name")}
                  />
                </label>
              )}

              <label className="text-sm capitalize font-bold" htmlFor="budget">
                {ti("budget")}
                <input
                  className="flex-1 w-full block p-2 border-gray-300 outline-none rounded shadow-sm"
                  {...register("budget", { required: tm("required") })}
                  type="number"
                  name="budget"
                  placeholder={ti("sum")}
                />
              </label>
            </div>
            <button
              className="py-2 px-4 w-50 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
              type="submit"
            >
              {tb("apply")}
            </button>
          </form>
        ))}
    </div>
  );
};

export default AddBudgetForm;
