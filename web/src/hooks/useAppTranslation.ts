import { useTranslations } from "next-intl";

export const useAppTranslation = () => {
  const th = useTranslations("Header");
  const ta = useTranslations("Auth");
  const tb = useTranslations("Buttons");
  const tm = useTranslations("Messages");
  const tt = useTranslations("Travel");
  const ti = useTranslations("Inputs");
  const tbg = useTranslations("Budget");
  const tr = useTranslations("Road");
  const tinc = useTranslations("Insurances");
  const tincome = useTranslations("Incomes");
  const te = useTranslations("Expense");

  return { th, ta, tb, tbg, tm, tt, ti, tr, tinc,tincome,te };
};
