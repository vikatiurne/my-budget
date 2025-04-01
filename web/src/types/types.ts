export interface User {
  _id: string;
  name?: string;
  email: string;
  password: string;
}
export interface IDate {
  mounth: number;
  year: number;
}

export interface Budget {
  _id?: string;
  budget: number;
  savings?: number;
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
