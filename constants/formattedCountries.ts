import { CountrySelectValue } from "@/types";

import countries from "world-countries";

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
