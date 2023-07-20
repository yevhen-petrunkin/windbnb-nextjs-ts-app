import formattedCountries from "@/constants/formattedCountries";

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getCountryByValue = (value: string) =>
    formattedCountries.find((item) => item.value === value);

  return { getAll, getCountryByValue };
};

export default useCountries;
