import { IListingsParams } from "@/interfaces";

function createListingsQueryFromSearchParams(params: IListingsParams): object {
  const {
    userId,
    category,
    locationValue,
    startDate,
    endDate,
    guestCount,
    roomCount,
    bathroomCount,
  } = params;

  let query: any = {};

  if (userId) {
    query.userId = userId;
  }

  if (category) {
    query.category = category;
  }

  if (locationValue) {
    query.locationValue = locationValue;
  }

  if (guestCount) {
    query.guestCount = { gte: +guestCount };
  }

  if (roomCount) {
    query.roomCount = { gte: +roomCount };
  }

  if (bathroomCount) {
    query.bathroomCount = { gte: +bathroomCount };
  }

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
          ],
        },
      },
    };
  }

  return query;
}

export default createListingsQueryFromSearchParams;
