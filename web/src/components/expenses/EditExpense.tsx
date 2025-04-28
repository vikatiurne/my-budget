import Image from "next/image";
import React, { useState } from "react";
import edit from "../../../public/images/edit.svg";
import { IExpense } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "@/utils/api";
import { useForm } from "react-hook-form";
import Popap from "../UI/Popap";

interface EditExpenseProps {
  expense: IExpense;
}

const EditExpense: React.FC<EditExpenseProps> = ({ expense }) => {
  const [showPopap, setShowPopap] = useState(false);

  const { register, handleSubmit, reset } = useForm<IExpense>({
    defaultValues: {
      title: expense.title,
      price: expense.price,
    },
  });

  const queryClient = useQueryClient();

  const editExpenseMutation = useMutation({
    mutationFn: (data: IExpense) =>
      updateExpense(expense._id, expense.budget_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const handleEdit = () => setShowPopap(true);

  const onSubmit = (data: IExpense) => {
    editExpenseMutation.mutate(data);
    reset(data);
    setShowPopap(false);
  };

  return (
    <>
      <Image
        src={edit}
        alt="edit"
        className="w-5 cursor-pointer"
        onClick={handleEdit}
      />
      {showPopap && (
        <Popap active={showPopap} setActive={() => setShowPopap(false)}>
          <h6 className="text-white text-center mb-4 uppercase">
            Edit Expense
          </h6>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="flex gap-4 items-center mb-4">
              <input
                className=" p-2 block w-1/2  border-gray-300 outline-none rounded shadow-sm  bg-yellow-50 text-black"
                placeholder="title an expense sourse.."
                type="text"
                {...register("title", { required: "this field is required" })}
              />
              <input
                className=" p-2 block w-1/2 border-gray-300 outline-none rounded shadow-sm bg-yellow-50 text-black"
                type="number"
                placeholder="type a sum..."
                {...register("price", { required: "this field is required" })}
              />
            </div>
            <div className="flex gap-4 items-center justify-center">
              <button
                type="submit"
                className="py-2 px-4 shadow rounded cursor-pointer bg-blue-200 text-[#6e5514] hover:bg-blue-300 hover:text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowPopap(false)}
                className="py-2 px-2.5 shadow rounded cursor-pointer bg-yellow-200 text-[#6e5514] hover:bg-yellow-300 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </Popap>
      )}
    </>
  );
};

export default EditExpense;
