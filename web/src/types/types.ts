export interface User {
  _id: string;
  email: string;
  password: string;
}
export interface IDate {
  mounth: string;
  year: string;
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
