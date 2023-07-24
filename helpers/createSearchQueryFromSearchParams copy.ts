import { SearchState } from "@/types";

import qs from "query-string";
import { formatISO } from "date-fns";

function createSearchQueryFromSearchParams(
  params: any,
  config: SearchState
): any {
  const { location, guestCount, roomCount, bathroomCount, dateRange } = config;

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery: any = {
    ...currentQuery,
    locationValue: location?.value,
    guestCount,
    roomCount,
    bathroomCount,
  };

  if (dateRange.startDate) {
    updatedQuery.startDate = formatISO(dateRange.startDate);
  }

  if (dateRange.endDate) {
    updatedQuery.startDate = formatISO(dateRange.endDate);
  }

  return updatedQuery;
}

export default createSearchQueryFromSearchParams;
