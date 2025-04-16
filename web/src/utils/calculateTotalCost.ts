
interface NeedsProps {
  price: string | null;
  qtypeople: string;
}

export const calculateTotalCost = <T extends NeedsProps>(
  data: T[] | undefined
): number => {
  if (data !== undefined) {
    const propsArr = data.map((item) => {
      const needsProps: Array<keyof NeedsProps> = ["price", "qtypeople"];
      const needs: Partial<NeedsProps> = {};
      for (let k of needsProps) {
        if (item.hasOwnProperty(k)) needs[k] = item[k] !== null ? item[k] : "";
      }
      console.log(needs);

      return needs as NeedsProps;
    });
    return propsArr.reduce((acc: number, item: NeedsProps): number => {
      if (item.price !== null) {
        return acc + parseInt(item.price) / parseInt(item.qtypeople);
      }

      return acc;
    }, 0);
  } else {
    return 0;
  }
};
