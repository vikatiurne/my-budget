import { ITravel, ITravelCosts } from "@/types/types";

interface ArrWithoutPeople {
  price: string | null;
}

interface NeedsProps {
  price: string | null;
  qtypeople: string;
}

const calculateTotalCost = <T extends NeedsProps>(
  data: T[] | undefined
): number => {
  const propsArr = (data ?? []).map((item) => {
    const needsProps: Array<keyof NeedsProps> = ["price", "qtypeople"];
    const needs: Partial<NeedsProps> = {};
    for (const k of needsProps) {
      if (item.hasOwnProperty(k)) needs[k] = item[k] ?? "";
    }

    return needs as NeedsProps;
  });
  return propsArr.reduce((acc: number, item: NeedsProps): number => {
    if (item.price !== null) {
      return acc + parseInt(item.price) / parseInt(item.qtypeople);
    }

    return acc;
  }, 0);
};

const getCostFromArrWithoutPeple = <T extends ArrWithoutPeople>(data: T[]) => {
  const price = data.reduce((acc, item) => {
    if (item.price !== null && item.price !== undefined) {
      return acc + parseInt(item.price);
    }
    return acc;
  }, 0);
  return price;
};

export const getDataTravelCost = (data: ITravelCosts): ITravel => {
  const accommodationCost = data.accommodation
    ? calculateTotalCost(data.accommodation)
    : 0;

  let transportCost = 0;

  if (data.transport) {
    const baseCost = getCostFromArrWithoutPeple(data.transport);
    transportCost = data.twosides ? baseCost * 2 : baseCost;
  }

  const greencardCost = data.greencard
    ? data.qtypeople
      ? parseInt(data.greencard) / parseInt(data.qtypeople)
      : parseInt(data.greencard)
    : 0;

  const healthInsuranceCost = data.healthInsurance
    ? parseInt(data.healthInsurance)
    : 0;

  const roadTaxCost = data.payroad ? calculateTotalCost(data.payroad) : 0;

  const sightseeingCost = data.sightseeing
    ? getCostFromArrWithoutPeple(data.sightseeing)
    : 0;

  const foodCost = data?.foodOptions
    ? getCostFromArrWithoutPeple(data.foodOptions)
    : 0;

  const activitiesCost =
    data.activities && data?.price
      ? data.qty
        ? parseInt(data.price) * parseInt(data.qty)
        : parseInt(data.price)
      : 0;

  const extra = data.extra ? parseInt(data.extra) : 0;

  const total =
    accommodationCost +
    transportCost +
    greencardCost +
    healthInsuranceCost +
    roadTaxCost +
    foodCost +
    activitiesCost +
    extra;

  const travelCostObj = {
    title: data.title,
    accommodationCost,
    transportCost,
    greencardCost,
    healthInsuranceCost,
    roadTaxCost,
    sightseeingCost,
    foodCost,
    activitiesCost,
    extra,
    total: +total.toFixed(2),
  };

  return travelCostObj;
};
