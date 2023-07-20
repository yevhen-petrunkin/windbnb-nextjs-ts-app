"use client";

import { ICountrySelectProps } from "@/interfaces";
import { CountrySelectValue } from "@/types";
import useCountries from "@/hooks/useCountries";
import Select from "react-select";

const CountrySelect: React.FC<ICountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},{" "}
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#1C1A27",
            primary25: "#F4ECFF",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
