import TravelCost, { ITravelCosts } from "../models/TravelCost";

export interface CalculationInfo {
  title: string;
  total: number;
}

class TravelCostServise {
  getCalculationById = async (
    id: string
  ): Promise<ITravelCosts | null | undefined> => {
    try {
      const calculation = await TravelCost.findById(id);
      return calculation;
    } catch (error: any) {
      throw error;
    }
  };

  getListCalculation = async (): Promise<
    CalculationInfo[] | null | undefined
  > => {
    try {
      const calculations = await TravelCost.find();

      const dataForCalculationList = calculations
        .map((item: ITravelCosts) => {
          const desiredProperties = ["title", "total"];
          const needProps: Partial<CalculationInfo> = {};

          for (const key of desiredProperties) {
            if (item.hasOwnProperty(key))
              needProps[key as keyof CalculationInfo] = item.get(key);
          }

          return needProps;
        })
        .filter(
          (item): item is CalculationInfo => !!item.title && !!item.total
        );

      return dataForCalculationList;
    } catch (error: any) {
      throw error;
    }
  };

  createTravelCost = async (
    data: ITravelCosts
  ): Promise<CalculationInfo[] | null | undefined> => {
    try {
      const travelcost = new TravelCost(data);
      travelcost.save();
      const allcalculations = this.getListCalculation();
      return allcalculations;
    } catch (error: any) {
      throw error;
    }
  };

  deleteCalculationById = async (
    id: string
  ): Promise<CalculationInfo[] | null | undefined> => {
    try {
      await TravelCost.findByIdAndDelete(id);
      const allcalculations = await this.getListCalculation();
      return allcalculations;
    } catch (error: any) {
      throw error;
    }
  };
}

export default new TravelCostServise();
