"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { ICalendarProps } from "@/interfaces";
import { DateRange } from "react-date-range";

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
      disabledDates={disabledDates || []}
    />
  );
};

export default Calendar;
