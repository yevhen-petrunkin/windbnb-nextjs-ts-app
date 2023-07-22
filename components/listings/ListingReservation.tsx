"use client";

import { IListingReservationProps } from "@/interfaces";
import Calendar from "../inputs/Calendar";

import Button from "../Button";

const ListingReservation: React.FC<IListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <article className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <span className="flex flex-row items-center gap-1 p-4 border-b-neutral-500 border-b-[1px]">
        <p className="text-2xl font-semibold">$ {price}</p>
        <p className="pl-4 font-light text-gray-600">night</p>
      </span>

      <Calendar
        range={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <span className="p-4 flex flex-row items-center justify-between font semibold text-lg border-t-neutral-500 border-t-[1px]">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </span>
    </article>
  );
};

export default ListingReservation;
