import { CountrySelectValue } from "@/types";

import formattedCountries from "@/constants/formattedCountries";

const useCountries = () => {
  const getAll = (): CountrySelectValue[] => formattedCountries;

  const getCountryByValue = (value: string): CountrySelectValue | undefined =>
    formattedCountries.find((item) => item.value === value);

  return { getAll, getCountryByValue };
};

export default useCountries;
