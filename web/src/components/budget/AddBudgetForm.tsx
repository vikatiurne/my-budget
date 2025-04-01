"use client";
import { Budget, IDate } from "@/types/types";
import { createBudget } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddBudgetForm = () => {
  const { register, handleSubmit, reset } = useForm<Budget>();

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("__budget_user_id");
    setUserId(id);
  }, []);

  const budgetMutation = useMutation({
    mutationFn: (budgetdata: Budget) => createBudget(budgetdata),
  });

  const onSubmit: SubmitHandler<FieldValues> =  (data: number) => {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    const arrDate = isoDate.split("-");
 
    const currentMounthYear: IDate = { year: arrDate[0], mounth: arrDate[1] };

    budgetMutation.mutate({
      budget: data,
      date: currentMounthYear,
      user_id: userId,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="budget">Mounthly Budget</label>
      <input
        {...register("budget", { required: "this field is required" })}
        type="number"
        name="budget"
        placeholder="type a sum"
      />
      <button type="button">Apply</button>
    </form>
  );
};

export default AddBudgetForm;
