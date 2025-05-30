import {
  IBudget,
  IExpense,
  User,
  ITravelCosts,
  ICalculationInfo,
  IBudgetUpdate,
  Income,
} from "@/types/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//user
export const login = async (email: string, password: string): Promise<User> => {
  const res = await axios.post(`${API_URL}/user/login`, { email, password });
  return res.data;
};
export const registration = async (data: User): Promise<User> => {
  const res = await axios.post(`${API_URL}/user/registration`, { data });
  return res.data;
};
export const getUser = async (id: string): Promise<User> => {
  const res = await axios.get(`${API_URL}/user/getUserById/${id}`);
  return res.data;
};

//budget
export const createBudget = async (budgetdata: IBudget): Promise<IBudget[]> => {
  const res = await axios.post(`${API_URL}/budget/createBudget`, {
    budgetdata,
  });
  return res.data;
};
export const getBudget = async (
  userId: string,
  mounth: string,
  year: string
): Promise<IBudgetUpdate[]> => {
  const res = await axios.get(
    `${API_URL}/budget/getBudget/${userId}?mounth=${mounth}&year=${year}`
  );
  return res.data;
};
export const getBudgetById = async (
  budgetId: string
): Promise<IBudgetUpdate> => {
  const res = await axios.get(`${API_URL}/budget/getBudgetById/${budgetId}`);
  return res.data;
};
export const getBudgets = async (userId: string): Promise<IBudgetUpdate[]> => {
  const res = await axios.get(`${API_URL}/budget/getAllBudgets/${userId}`);
  return res.data;
};
export const updateBudget = async (
  budgetId: string,
  income: number
): Promise<IBudgetUpdate> => {
  const res = await axios.put(`${API_URL}/budget/updateBudget/${budgetId}`, {
    income,
  });
  return res.data;
};
export const deleteBudget = async (
  budgetId: string
): Promise<IBudgetUpdate> => {
  const res = await axios.delete(`${API_URL}/budget/deleteBudget/${budgetId}`);
  return res.data;
};

//incomes
export const getIncomes = async (budgetId: string): Promise<Income[]> => {
  const res = await axios.get(`${API_URL}/income/getIncomes/${budgetId}`);
  return res.data;
};

export const createIncome = async (incomedata: Income): Promise<Income[]> => {
  const res = await axios.post(`${API_URL}/income/createIncome`, {
    incomedata,
  });
  return res.data;
};

export const updateIncome = async (incomedata: Income): Promise<Income[]> => {
  const res = await axios.put(`${API_URL}/income/updateIncome`, { incomedata });
  return res.data;
};

//expense
export const getExpenses = async (
  budgetId: string,
  from: string,
  till: string,
  page?: string,
  limit?: string
): Promise<IExpense[]> => {
  const res = await axios.get(
    `${API_URL}/expense/getExpenses/${budgetId}?from=${from}&&till=${till}&&page=${page}&&limit=${limit}`
  );
  return res.data;
};
export const createExpense = async (data: IExpense): Promise<IExpense[]> => {
  const res = await axios.post(`${API_URL}/expense/createExpense`, { data });
  return res.data;
};
export const updateExpense = async (
  id: string,
  budgetId: string,
  data: IExpense
): Promise<IExpense> => {
  const res = await axios.put(
    `${API_URL}/expense/updateExpense/${id}/${budgetId}`,
    {
      data,
    }
  );
  return res.data;
};
export const deleteExpense = async (
  id: string,
  sum: number
): Promise<IExpense> => {
  const res = await axios.delete(`${API_URL}/expense/deleteExpense/${id}`, {
    data: { sum },
  });
  return res.data;
};

//travel
export const createTravel = async (
  data: ITravelCosts
): Promise<ICalculationInfo[]> => {
  const res = await axios.post(`${API_URL}/calculation/createCalculation`, {
    data,
  });
  return res.data;
};

export const getTravelById = async (id: string): Promise<ITravelCosts> => {
  const res = await axios.get(`${API_URL}/calculation/getCalculation/${id}`);
  return res.data;
};

export const getList = async (): Promise<ICalculationInfo[]> => {
  const res = await axios.get(`${API_URL}/calculation/getAllCalculations`);
  return res.data;
};

export const updateTravelCost = async (
  id: string,
  data: ITravelCosts
): Promise<ICalculationInfo> => {
  const res = await axios.put(
    `${API_URL}/calculation/updateCalculation/${id}`,
    { data }
  );
  return res.data;
};

export const deleteTravelCost = async (
  id: string
): Promise<ICalculationInfo[]> => {
  const res = await axios.delete(
    `${API_URL}/calculation/removeCalculation/${id}`
  );

  return res.data;
};
