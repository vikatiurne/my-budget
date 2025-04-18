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
  price: string | null;
}

export interface IAccommodation {
  nameHotel: string;
  price: string | null;
  qtypeople: string;
}
export interface IGreenCard {
  price: string | null;
  qtypeople: string;
}
export interface IRoadTax {
  country: string;
  price: string | null;
  qtypeople: string;
}
export interface ISightseeing {
  landmark: string;
  price: string | null;
}
export interface IFoodOptions {
  eateries: string;
  price: string | null;
}
export interface IActivities {
  typeofActivities: string;
  price: string | null;
  qty: string;
}

export interface ITravelCosts {
  _id: string;
  title: string;
  accommodation: IAccommodation[];
  transport: ITransport[];
  greencard?: string;
  qtypeople?: string;
  healthInsurance?: string;
  payroad?: IRoadTax[];
  sightseeing?: ISightseeing[];
  foodOptions?: IFoodOptions[];
  activities?: string;
  price?: string;
  qty?: string;
  twosides: boolean;
  extra?: string;
  total: number;
  budget_id?: string;
  user_id?: string;
}

export interface ITravel {
  title: string;
  budget_id?: string;
  user_id?: string;
  accommodationCost: number;
  transportCost: number;
  greencardCost: number;
  healthInsuranceCost: number;
  roadTaxCost: number;
  sightseeingCost: number;
  foodCost: number;
  activitiesCost: number;
  extra: number;
  total: number;
}

export interface IMetrics {
  distance: number;
  mileage: number;
  price: number;
  qtypeople: number;
}

export interface ICalculationInfo {
  title: string;
  total: number;
}
