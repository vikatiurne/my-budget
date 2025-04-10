import { IAccommodation } from '@/types/types';
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';

const AccommodationForm = () => {
    const methods = useForm<{ hotels: IAccommodation[] }>();
    const { register, handleSubmit, control } = methods;
  
    const { fields, append, remove } = useFieldArray({
      control,
      name: "hotels",
    });
  
    useEffect(() => {
      if (fields.length === 0) {
        append({ nameHotel: "", price: null });
      }
    }, [append, fields.length]);
  
  
    return (
      <div>
        {fields.map((item, idx) => (
          <div key={item.id} className="flex gap-4 mb-4">
            <div className="flex flex-wrap gap-2 items-center ">
              <label htmlFor={`name-${idx}`} className="text-sm font-bold">
                Accomodation №{idx + 1}:
              </label>
              <div className="flex gap-4 items-center">
                <input
                  className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
                  type="text"
                  placeholder="name..."
                  {...register(`hotels.${idx}.nameHotel`, {
                    required: "this field is required",
                  })}
                />
                <input
                  className="flex-1 p-2 block w-1/2 border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
                  type="number"
                  placeholder="price..."
                  {...register(`hotels.${idx}.price`, {
                    required: "this field is required",
                  })}
                />
  
                <div className="flex gap-2 items-center ">
                  {idx === 0 && (
                    <button
                      className="p-2 w-6 shadow-md rounded-b-full bg-[#daa520] text-white uppercase text-sm cursor-pointer"
                      type="button"
                      onClick={() => append({ nameHotel: "", price: null })}
                    >
                      +
                    </button>
                  )}
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="p-2 w-6  shadow-md rounded-t-full bg-[#daa520] text-white font-bold uppercase text-sm cursor-pointer"
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default AccommodationForm