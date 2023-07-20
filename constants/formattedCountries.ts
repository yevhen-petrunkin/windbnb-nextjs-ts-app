import countries from "world-countries";
import { CountrySelectValue } from "@/types";

const formattedCountries: CountrySelectValue[] = countries.map(
  ({ cca2, name, flag, latlng, region }) => ({
    value: cca2,
    label: name.common,
    flag,
    latlng,
    region,
  })
);

export default formattedCountries;
