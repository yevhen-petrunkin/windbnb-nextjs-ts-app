import formattedCountries from "@/constants/formattedCountries";
import { CountrySelectValue } from "@/types";

const useCountries = () => {
  const getAll = (): CountrySelectValue[] => formattedCountries;

  const getCountryByValue = (value: string): CountrySelectValue | undefined =>
    formattedCountries.find((item) => item.value === value);

  return { getAll, getCountryByValue };
};

export default useCountries;
