import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  handleDateStart: (date: Date) => void;
  handleDateEnd: (date: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  handleDateEnd,
  handleDateStart,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4">
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => date && handleDateStart(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            showPopperArrow={false}
            popperClassName="popperStart"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#daa520] max-w-[12rem] w-full"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <DatePicker
            selected={endDate}
            onChange={(date) => date && handleDateEnd(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            popperClassName="popperEnd"
            showPopperArrow={false}
            minDate={startDate ?? undefined}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#daa520] max-w-[12rem] w-full"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
