"use client";
import BudgetId from "@/components/budget/BudgetId";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string | string[] };
}

const BudgetDatail: React.FC<Props> = () => {
  const { id } = useParams();
  const budgetId = Array.isArray(id) ? id[0] : id;
  if (budgetId) return <BudgetId budgetId={budgetId} />;
};

export default BudgetDatail;
