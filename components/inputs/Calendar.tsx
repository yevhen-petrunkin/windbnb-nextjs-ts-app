"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

import { ICalendarProps } from "@/interfaces";

const Calendar: React.FC<ICalendarProps> = ({
  range,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#1C1A27"]}
      ranges={[range]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
