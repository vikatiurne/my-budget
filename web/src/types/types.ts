export interface User {
  _id: string;
  name?: string;
  email: string;
  password: string;
}
export interface IDate {
  mounth: string;
  year: string;
}
export interface Income {
  _id?: string;
  incomename: string;
  sum: number;
}
export interface Budget {
  _id?: string;
  budget: number;
  income: Income[];
  user_id: string;
  date: IDate;
  createdAt?: Date;
}
export interface Expense {
  title: string;
  price: number;
  budget_id: string;
  user_id: string;
}

export interface ErrorResponse {
  message: string;
}
