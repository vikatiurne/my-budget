import React, { useEffect, useState } from "react";
import {
  MdOutlineShoppingCart,
  MdFastfood,
  MdOutlineSportsGymnastics,
  MdOutlineSmokingRooms,
} from "react-icons/md";
import {
  BsFillPiggyBankFill,
  BsCapsulePill,
  BsHammer,
  BsLuggage,
  BsUbuntu,
} from "react-icons/bs";
import {
  GiVibratingSmartphone,
  GiClothes,
  GiLips,
  GiPartyPopper,
} from "react-icons/gi";

import { IoSchool, IoCarSport } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa";
import { HiMiniTv } from "react-icons/hi2";
import { RiHealthBookFill } from "react-icons/ri";
import { SiPetsathome } from "react-icons/si";
import { BiBusSchool, BiSolidDonateHeart } from "react-icons/bi";
import { IoIosGift } from "react-icons/io";
import { LuArmchair } from "react-icons/lu";
import { PiBabyBold } from "react-icons/pi";
import Icon from "../UI/Icon";
import AddExpenseForm from "./AddExpenseForm";
import { IBudgetUpdate } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const styles = {
  icon: "p-1 w-10 h-10 border rounded",
};

interface CategoryExpensesProps {
  budget: IBudgetUpdate;
}

const CategoryExpenses: React.FC<CategoryExpensesProps> = ({ budget }) => {
  const [showAddExpensesForm, setShowAddExpensesForm] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [includeField, setIncludeField] = useState<boolean>(false);

  const handleAddExpense = (categoryname: string) => {
    setSelectedCategory(categoryname);
    setShowAddExpensesForm(
      categoryname !== selectedCategory || !showAddExpensesForm
    );
  };

  useEffect(() => {
    if (selectedCategory === "other") {
      setIncludeField(true);
    } else {
      setIncludeField(false);
    }
  }, [selectedCategory]);

  const categoryValue =
    selectedCategory === "other" ? "other" : selectedCategory;
  
    const {te} = useAppTranslation()

  return (
    <section>
      <div className="mb-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 xl:grid-cols-10 2xl:grid-cols-12 grid-rows-2 gap-3 sm:gap-4 md:gap-6">
        <Icon
          onClick={() => {
            handleAddExpense("prodact");
          }}
          name={te("prodacts")}
        >
          <MdOutlineShoppingCart className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("restaurant");
          }}
          name={te("restaurant")}
        >
          <MdFastfood className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("connect");
          }}
          name={te("connect")}
        >
          <GiVibratingSmartphone className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("education");
          }}
          name={te("education")}
        >
          <IoSchool className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("children");
          }}
          name={te("children")}
        >
          <PiBabyBold className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("clothes");
          }}
          name={te("clothes")}
        >
          <GiClothes className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("car");
          }}
          name={te("car")}
        >
          <IoCarSport className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("transport");
          }}
          name={te("transport")}
        >
          <BiBusSchool className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("beauty");
          }}
          name={te("beauty")}
        >
          <GiLips className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("sport");
          }}
          name={te("sport")}
        >
          <MdOutlineSportsGymnastics className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("alcohol");
          }}
          name={te("alcohol")}
        >
          <FaWineBottle className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("cigarettes");
          }}
          name={te("cigarettes")}
        >
          <MdOutlineSmokingRooms className={styles.icon} />
        </Icon>

        <Icon
          onClick={() => {
            handleAddExpense("health");
          }}
          name={te("health")}
        >
          <RiHealthBookFill className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("pills");
          }}
          name={te("pills")}
        >
          <BsCapsulePill className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("pets");
          }}
          name={te("pets")}
        >
          <SiPetsathome className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("repair");
          }}
          name={te("repair")}
        >
          <BsHammer className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("housegoods");
          }}
          name={te("housegoods")}
        >
          <HiMiniTv className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("entertainment");
          }}
          name={te("entertainment")}
        >
          <GiPartyPopper className={styles.icon} />
        </Icon>

        <Icon
          onClick={() => {
            handleAddExpense("gifts");
          }}
          name={te("gifts")}
        >
          <IoIosGift className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("travelling");
          }}
          name={te("travelling")}
        >
          <BsLuggage className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("furniture");
          }}
          name={te("furniture")}
        >
          <LuArmchair className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("charity");
          }}
          name={te("charity")}
        >
          <BiSolidDonateHeart className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("savings");
          }}
          name={te("savings")}
        >
          <BsFillPiggyBankFill className={styles.icon} />
        </Icon>
        <Icon
          onClick={() => {
            handleAddExpense("other");
          }}
          name={te("other")}
        >
          <BsUbuntu className={styles.icon} />
        </Icon>
      </div>
      {showAddExpensesForm && (
        <AddExpenseForm
          budgetId={budget._id}
          includeField={includeField}
          category={categoryValue}
        />
      )}
    </section>
  );
};

export default CategoryExpenses;
