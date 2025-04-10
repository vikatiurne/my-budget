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
  _id: string;
  budget: number;
  income: Income[];
  user_id: string;
  date: IDate;
  createdAt?: Date;
}
export interface IExpense {
  _id: string;
  title: string;
  price: number;
  budget_id: string;
  user_id: string;
}

export interface ErrorResponse {
  message: string;
}

export interface ITransport {
  typeofTransport: string;
  price: number | null;
}

export interface IAccommodation {
  nameHotel: string;
  price: number | null;
}
export interface IRoadTax {
  country: string;
  price: number | null;
}
export interface ISightseeing {
  landmark: string;
  price: number | null;
}
export interface IFoodOptions {
  eateries: string;
  price: number | null;
}
export interface IActivities {
  typeofActivities: string;
  price: number | null;
}

export interface ITravelCosts {
  _id: string;
  title: string;
  accommodation: IAccommodation[];
  transport: ITransport[];
  greencard?: number;
  healthInsuranse?: number;
  roadTax?: IRoadTax[];
  sightseeing?: ISightseeing[];
  foodOptions?: IFoodOptions;
  activities?: IActivities;
  extra?: number | null;
  total: number;
  budget_id?: string;
  user_id?: string;
}

export interface ICalculationInfo {
  title: string;
  total: number;
}
