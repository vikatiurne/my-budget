import { Budget, Expense, IDate, User } from "@/types/types";
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
export const createBudget = async (budgetdata: Budget): Promise<Budget> => {
  const res = await axios.post(`${API_URL}/budget/createBudget`, {
    budgetdata,
  });
  return res.data;
};
export const getBudget = async (
  userId: string,
  mounth: number,
  year: number
): Promise<Budget> => {
  const res = await axios.get(
    `${API_URL}/budget/getBudget/${userId}?mounth=${mounth}&year=${year}`
  );
  return res.data;
};
export const updateBudget = async (
  userId: string,
  date: IDate,
  income: number
): Promise<Budget> => {
  const res = await axios.put(`${API_URL}/budget/updateBudget/${userId}`, {
    date,
    income,
  });
  return res.data;
};

//expense
export const getExpenses = async (
  userId: string,
  budgetId: string
): Promise<Expense> => {
  const res = await axios.get(
    `${API_URL}/expense/getExpenses/${userId}/budget/${budgetId}`
  );
  return res.data;
};
export const createExpense = async (data: Expense): Promise<Expense> => {
  const res = await axios.post(`${API_URL}/expense/createExpense`, { data });
  return res.data;
};
export const updateExpense = async (
  id: string,
  data: Expense
): Promise<Expense> => {
  const res = await axios.put(`${API_URL}/expense/updateExpense/${id}`, {
    data,
  });
  return res.data;
};
export const deleteExpense = async (id: string): Promise<Expense> => {
  const res = await axios.delete(`${API_URL}/expense/deleteExpense/${id}`);
  return res.data;
};
