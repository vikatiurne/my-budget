import BudgetId from "@/components/budget/BudgetId";

import React from "react";

type Params = Promise<{ id: string | string[] }>;

export default async function BudgetDatail({ params }: { params: Params }) {
  const { id } = await params;
  const budgetId = Array.isArray(id) ? id[0] : id;
  if (budgetId) return <BudgetId budgetId={budgetId} />;
}
